import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { BenchmarkPdfReportProvider } from '@cui/network/providers/pdf';
import type { BenchmarkRunReferenceDto, RecordBenchmarkSampleDto } from '../benchmark.dto.js';
import type { Benchmark, BenchmarkReport, BenchmarkSessionRecord } from '../benchmark.models.js';
import {
  BENCHMARK_BUMP_PROVIDER,
  type BenchmarkBumpProvider,
} from '../benchmark-bump.provider.js';
import { BENCHMARK_GROUP_BUMP_PROVIDER, type BenchmarkGroupBumpProvider } from '../benchmark-group-bump.provider.js';
import { BenchmarkRepository, ComputeRepository, SourceRepository } from '../repositories/index.js';
import { createBenchmarkPdfModel } from '../utils/create-benchmark-pdf-model.js';

export const BENCHMARK_PDF_PROVIDER = Symbol('BENCHMARK_PDF_PROVIDER');

@Injectable()
export class BenchmarkService {
  constructor(
    private readonly benchmarkRepository: BenchmarkRepository,
    private readonly computeRepository: ComputeRepository,
    private readonly sourceRepository: SourceRepository,
    @Inject(BENCHMARK_BUMP_PROVIDER)
    private readonly bumpProvider: BenchmarkBumpProvider,
    @Inject(BENCHMARK_GROUP_BUMP_PROVIDER)
    private readonly groupBumpProvider: BenchmarkGroupBumpProvider,
    @Inject(BENCHMARK_PDF_PROVIDER)
    private readonly pdfProvider: BenchmarkPdfReportProvider,
  ) {}

  async get(computeId: string): Promise<Benchmark | null> {
    await this.requireCompute(computeId);
    const session = await this.benchmarkRepository.findSession(computeId);
    return session ? this.toBenchmark(session) : null;
  }

  async getStatus(computeId: string): Promise<Pick<BenchmarkSessionRecord, 'runId' | 'status'> | null> {
    const session = await this.benchmarkRepository.findSession(computeId);
    return session ? { runId: session.runId, status: session.status } : null;
  }

  async start(computeId: string, intervalSeconds: number): Promise<Benchmark> {
    if (!Number.isInteger(intervalSeconds) || intervalSeconds < 0 || intervalSeconds > 10) {
      throw new BadRequestException('Update frequency must be a whole number of seconds from 0 to 10.');
    }
    const compute = await this.requireCompute(computeId);
    const previous = await this.benchmarkRepository.findSession(computeId);
    if (previous?.status === 'recording') {
      throw new ConflictException('Benchmark recording is already running for this compute.');
    }
    const sources = await Promise.all(
      compute.sourceIds.map((sourceId) => this.sourceRepository.requireSource(sourceId)),
    );
    const now = new Date();
    const session: BenchmarkSessionRecord = {
      id: `session:${computeId}`,
      kind: 'session',
      computeId,
      computeName: compute.name,
      runId: randomUUID(),
      status: 'recording',
      intervalSeconds,
      startedAt: now,
      instances: sources.map((source) => ({
        sourceId: source._id,
        name: source.name,
        provider: source.provider,
      })),
      createdAt: now,
    };
    await this.benchmarkRepository.clearSamples(computeId);
    await this.benchmarkRepository.saveSession(session);
    return { ...this.benchmarkDetails(session), samples: [] };
  }

  async stop(computeId: string, runId: string): Promise<Benchmark> {
    const session = await this.requireRecording(computeId, runId);
    const stopped: BenchmarkSessionRecord = {
      ...session,
      status: 'stopped',
      stoppedAt: new Date(),
    };
    await this.benchmarkRepository.saveSession(stopped);
    return this.toBenchmark(stopped);
  }

  async recordSample(computeId: string, input: RecordBenchmarkSampleDto): Promise<{ recorded: true }> {
    const session = await this.requireRecording(computeId, input.runId);
    if (!session.instances.some(({ sourceId }) => sourceId === input.sourceId)) {
      throw new BadRequestException('The source does not belong to this compute benchmark.');
    }
    const observedAt = new Date(input.observedAt);
    if (!Number.isFinite(observedAt.getTime()) || !Number.isFinite(input.updateTimeMs) || input.updateTimeMs < 1) {
      throw new BadRequestException('Benchmark sample requires a valid time and positive update duration.');
    }
    const footprintBytes = input.footprintBytes ?? (input.status === 'failed'
      ? 0
      : (await this.sourceRepository.listObservations(input.sourceId))
        .reduce((total, { body }) => total + (Number.isFinite(body.value) ? String(body.value).length : 0), 0));
    if (!Number.isInteger(footprintBytes) || footprintBytes < 0) {
      throw new BadRequestException('Benchmark footprint must be a non-negative number of bytes.');
    }
    await this.benchmarkRepository.addSample({
      id: `sample:${randomUUID()}`,
      kind: 'sample',
      computeId,
      runId: input.runId,
      sourceId: input.sourceId,
      footprintBytes,
      updateTimeMs: input.updateTimeMs,
      observedAt,
      status: input.status ?? 'success',
      errorMessage: input.errorMessage,
      createdAt: new Date(),
    });
    return { recorded: true };
  }

  removeCompute(computeId: string): Promise<void> {
    return this.benchmarkRepository.removeCompute(computeId);
  }

  async saveBumpReport(computeId: string, runId: string): Promise<{ file: string }> {
    const compute = await this.requireCompute(computeId);
    const session = await this.benchmarkRepository.findSession(computeId);
    if (!session || session.runId !== runId || session.status !== 'stopped' || !session.stoppedAt) {
      throw new ConflictException('Stop the selected benchmark recording before saving its Bump report.');
    }

    const report = await this.benchmarkRepository.calculateReport(session);
    await this.bumpProvider.create(compute.name, {
      meta: {
        report: 'benchmark-report',
        modelVersion: 5,
        serverId: computeId,
        serverName: compute.name,
        runId,
        intervalSeconds: session.intervalSeconds,
        startedAt: session.startedAt,
        stoppedAt: session.stoppedAt,
        exportedAt: new Date(),
        instanceCount: report.data.length,
        queryCount: report.queryCount,
        failedQueryCount: report.failedQueryCount,
        averageUpdateTimeMs: report.averageUpdateTimeMs,
        peakUpdateTimeMs: report.peakUpdateTimeMs,
        totalFootprintBytes: report.totalFootprintBytes,
        chart: { horizontalAxis: 'observedAt', verticalAxis: 'updateTimeMs', unit: 'ms' },
        providerComparison: { timeWindows: 24, method: 'mean-of-instance-means' },
        averageComparison: {
          baselineUpdateTimeMs: report.averageUpdateTimeMs,
          method: 'mean-of-successful-queries',
        },
      },
      data: report.data,
    });
    return { file: `bump/Benchmark Report/${compute.name}.bump.ts` };
  }

  async exportPdfReport(computeId: string, runId: string): Promise<{ fileName: string; content: Buffer }> {
    const compute = await this.requireCompute(computeId);
    const session = await this.benchmarkRepository.findSession(computeId);
    if (!session || session.runId !== runId || session.status !== 'stopped' || !session.stoppedAt) {
      throw new ConflictException('Stop the selected benchmark recording before exporting its PDF report.');
    }
    const benchmark = await this.toBenchmark(session);
    const content = await this.pdfProvider.create(createBenchmarkPdfModel(benchmark));
    return { fileName: `${compute.name}-benchmark-report.pdf`, content };
  }

  async downloadBumpReport(computeId: string): Promise<{ fileName: string; content: Buffer }> {
    const compute = await this.requireCompute(computeId);
    const session = await this.benchmarkRepository.findSession(computeId);
    if (!session || session.status !== 'stopped' || !session.stoppedAt) {
      throw new ConflictException('Stop the selected benchmark recording before downloading its Bump report.');
    }
    await this.saveBumpReport(computeId, session.runId);
    return { fileName: `${compute.name}-benchmark.bump.ts`, content: await this.bumpProvider.read(compute.name) };
  }

  async exportGroupBumpReport(runs: BenchmarkRunReferenceDto[]): Promise<{ fileName: string; content: Buffer }> {
    const { servers: reports } = await this.requireStoppedReport(runs);
    const data = await Promise.all(reports.map(async ({ computeId, runId, computeName }) => {
      await this.saveBumpReport(computeId, runId);
      const file = await this.bumpProvider.findOne(computeName);
      return { server: file.meta, instances: file.data };
    }));
    const name = `benchmark-${randomUUID()}`;
    await this.groupBumpProvider.create(name, {
      meta: { report: 'benchmark-group', modelVersion: 1, serverCount: data.length, exportedAt: new Date() },
      data,
    });
    return { fileName: `${name}.bump.ts`, content: await this.groupBumpProvider.read(name) };
  }

  async exportGroupPdfReport(runs: BenchmarkRunReferenceDto[]): Promise<{ fileName: string; content: Buffer }> {
    const { servers: reports } = await this.requireStoppedReport(runs);
    return {
      fileName: `benchmark-${reports.length}-servers.pdf`,
      content: await this.pdfProvider.createMany(reports.map(createBenchmarkPdfModel)),
    };
  }

  private async requireStoppedReport(runs: BenchmarkRunReferenceDto[]): Promise<BenchmarkReport> {
    if (!Array.isArray(runs) || runs.length === 0 ||
        new Set(runs.map(({ computeId }) => computeId)).size !== runs.length) {
      throw new BadRequestException('Select at least one distinct server for a benchmark report.');
    }
    const servers = await Promise.all(runs.map(async ({ computeId, runId }) => {
      const benchmark = await this.get(computeId);
      if (!benchmark || benchmark.runId !== runId || benchmark.status !== 'stopped') {
        throw new ConflictException(`The benchmark for server ${computeId} is not ready.`);
      }
      return benchmark;
    }));
    return { servers };
  }

  private async requireCompute(computeId: string) {
    const compute = await this.computeRepository.findById(computeId);
    if (!compute) throw new NotFoundException(`Compute was not found: ${computeId}`);
    return compute;
  }

  private async requireRecording(computeId: string, runId: string): Promise<BenchmarkSessionRecord> {
    await this.requireCompute(computeId);
    const session = await this.benchmarkRepository.findSession(computeId);
    if (!session || session.runId !== runId || session.status !== 'recording') {
      throw new ConflictException('This compute benchmark is no longer recording.');
    }
    return session;
  }

  private benchmarkDetails(session: BenchmarkSessionRecord) {
    return {
      computeId: session.computeId,
      computeName: session.computeName,
      runId: session.runId,
      status: session.status,
      intervalSeconds: session.intervalSeconds,
      startedAt: session.startedAt,
      stoppedAt: session.stoppedAt,
      instances: session.instances,
    };
  }

  private async toBenchmark(session: BenchmarkSessionRecord): Promise<Benchmark> {
    const samples = await this.benchmarkRepository.listSamples(session.computeId, session.runId);
    const instances = await Promise.all(session.instances.map(async (instance) => {
      if (instance.provider) return instance;
      try {
        const source = await this.sourceRepository.requireSource(instance.sourceId);
        return { ...instance, provider: source.provider };
      } catch (error) {
        if (error instanceof NotFoundException) return instance;
        throw error;
      }
    }));
    return {
      ...this.benchmarkDetails(session),
      instances,
      samples: samples.map(({ sourceId, footprintBytes, updateTimeMs, observedAt, status, errorMessage }) => ({
        sourceId,
        footprintBytes,
        updateTimeMs,
        observedAt,
        status: status ?? 'success',
        errorMessage,
      })),
    };
  }
}
