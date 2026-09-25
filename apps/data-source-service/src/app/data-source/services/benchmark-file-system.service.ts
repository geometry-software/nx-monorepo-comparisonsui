import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BenchmarkPdfReportProvider } from '@cui/network/providers/pdf';
import type { Benchmark, BenchmarkReport } from '../benchmark.models.js';
import { BENCHMARK_BUMP_PROVIDER, type BenchmarkBumpProvider } from '../benchmark-bump.provider.js';
import { createBenchmarkPdfModel } from '../utils/create-benchmark-pdf-model.js';
import { BENCHMARK_PDF_PROVIDER } from './benchmark.service.js';

type UploadedReport = { originalname: string; size: number; buffer: Buffer };
const maxReportBytes = 20 * 1024 * 1024;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new BadRequestException(`Invalid Bump report ${field}.`);
  return value;
}

function dateValue(value: unknown, field: string): Date {
  const date = new Date(stringValue(value, field));
  if (!Number.isFinite(date.getTime())) throw new BadRequestException(`Invalid Bump report ${field}.`);
  return date;
}

function numberValue(value: unknown, field: string, minimum = 0): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < minimum) {
    throw new BadRequestException(`Invalid Bump report ${field}.`);
  }
  return value;
}

@Injectable()
export class BenchmarkFileSystemService {
  constructor(
    @Inject(BENCHMARK_BUMP_PROVIDER) private readonly bumpProvider: BenchmarkBumpProvider,
    @Inject(BENCHMARK_PDF_PROVIDER) private readonly pdfProvider: BenchmarkPdfReportProvider,
  ) {}

  importReport(file: UploadedReport | undefined): BenchmarkReport {
    if (!file || !file.originalname.toLowerCase().endsWith('.bump.ts') || !file.buffer?.length ||
        file.size > maxReportBytes) {
      throw new BadRequestException('Select a non-empty .bump.ts report smaller than 20 MB.');
    }
    let model: { meta: unknown; data: unknown };
    try {
      model = this.bumpProvider.parse(file.buffer.toString('utf8'));
    } catch {
      throw new BadRequestException('The Bump report contains invalid JSON data.');
    }
    const { meta, data } = model;
    if (isRecord(meta) && meta.report === 'benchmark-group') {
      if (!Array.isArray(data) || !data.length || meta.serverCount !== data.length) {
        throw new BadRequestException('The Bump report has an invalid server list.');
      }
      const reports = data.map((entry) => {
        if (!isRecord(entry)) throw new BadRequestException('The Bump report has an invalid server.');
        return this.parseServer(entry.server, entry.instances);
      });
      if (new Set(reports.map(({ computeId }) => computeId)).size !== reports.length) {
        throw new BadRequestException('The Bump report contains duplicate servers.');
      }
      return { servers: reports };
    }
    return { servers: [this.parseServer(meta, data)] };
  }

  private parseServer(meta: unknown, data: unknown): Benchmark {
    if (!isRecord(meta) || (meta.report !== 'benchmark-report' && meta.report !== 'last-activity-report') || !Array.isArray(data)) {
      throw new BadRequestException('The file is not a Benchmark Report.');
    }
    const startedAt = dateValue(meta.startedAt, 'start time');
    const stoppedAt = dateValue(meta.stoppedAt, 'stop time');
    if (stoppedAt < startedAt) throw new BadRequestException('The report stop time is before its start time.');
    const intervalSeconds = numberValue(meta.intervalSeconds, 'interval');
    if (!Number.isInteger(intervalSeconds)) throw new BadRequestException('Invalid Bump report interval.');
    const sourceIds = new Set<string>();
    const instances: Benchmark['instances'] = [];
    const samples: Benchmark['samples'] = [];
    for (const entry of data) {
      if (!isRecord(entry) || !isRecord(entry.instance) || !Array.isArray(entry.chart) ||
          (entry.failedQueries !== undefined && !Array.isArray(entry.failedQueries))) {
        throw new BadRequestException('The Bump report has an invalid instance.');
      }
      const sourceId = stringValue(entry.instance.sourceId, 'source ID');
      if (sourceIds.has(sourceId)) throw new BadRequestException('The Bump report has duplicate source IDs.');
      sourceIds.add(sourceId);
      const provider = entry.instance.provider;
      if (provider !== 'memory' && provider !== 'mongodb' && provider !== 'firebase' && provider !== 'unknown') {
        throw new BadRequestException('The Bump report has an invalid provider.');
      }
      instances.push({ sourceId, name: stringValue(entry.instance.name, 'instance name'),
        provider: provider === 'unknown' ? undefined : provider });
      for (const point of entry.chart) {
        if (!isRecord(point)) throw new BadRequestException('The Bump report has an invalid chart point.');
        samples.push({ sourceId, observedAt: dateValue(point.observedAt, 'observation time'),
          updateTimeMs: numberValue(point.updateTimeMs, 'update time'),
          footprintBytes: numberValue(point.footprintBytes, 'footprint'), status: 'success' });
      }
      for (const failure of (entry.failedQueries ?? [])) {
        if (!isRecord(failure)) throw new BadRequestException('The Bump report has an invalid failed query.');
        samples.push({ sourceId, observedAt: dateValue(failure.observedAt, 'failed query time'),
          updateTimeMs: numberValue(failure.elapsedMs, 'failed query time elapsed'),
          footprintBytes: 0, status: 'failed',
          errorMessage: typeof failure.errorMessage === 'string' ? failure.errorMessage : undefined });
      }
    }
    if (!instances.length) throw new BadRequestException('The Bump report contains no instances.');
    samples.sort((left, right) => left.observedAt.getTime() - right.observedAt.getTime());
    return {
      computeId: stringValue(meta.serverId, 'server ID'),
      computeName: stringValue(meta.serverName, 'server name'),
      runId: stringValue(meta.runId, 'run ID'),
      status: 'stopped', intervalSeconds, startedAt, stoppedAt, instances, samples,
    };
  }

  async exportPdf(file: UploadedReport | undefined): Promise<{ fileName: string; content: Buffer }> {
    const benchmarks = this.importReport(file).servers;
    const content = await this.pdfProvider.createMany(benchmarks.map(createBenchmarkPdfModel));
    const fileName = benchmarks.length === 1
      ? `${benchmarks[0].computeName.replace(/[^a-zA-Z0-9_-]/g, '_')}-benchmark-report.pdf`
      : `benchmark-${benchmarks.length}-servers.pdf`;
    return { fileName, content };
  }
}
