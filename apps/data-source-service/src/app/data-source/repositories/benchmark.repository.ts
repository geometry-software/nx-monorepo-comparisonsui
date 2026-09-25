import { Inject, Injectable } from '@nestjs/common';
import { RepositoryNotFoundError } from '@cui/network/providers/core';
import type { MemoryRepositoryPort } from '@cui/network/providers/memory';
import type { BenchmarkBumpData } from '../benchmark-bump.provider.js';
import type {
  BenchmarkRecord,
  BenchmarkSampleRecord,
  BenchmarkSessionRecord,
} from '../benchmark.models.js';
import { BENCHMARK_MEMORY_REPOSITORY_PROVIDER } from './repository.tokens.js';

export { BENCHMARK_MEMORY_REPOSITORY_PROVIDER } from './repository.tokens.js';

@Injectable()
export class BenchmarkRepository {
  constructor(
    @Inject(BENCHMARK_MEMORY_REPOSITORY_PROVIDER)
    private readonly memory: MemoryRepositoryPort<
      BenchmarkRecord,
      BenchmarkRecord,
      BenchmarkSessionRecord
    >,
  ) {}

  async findSession(computeId: string): Promise<BenchmarkSessionRecord | null> {
    try {
      return await this.memory.findOne(`session:${computeId}`) as BenchmarkSessionRecord;
    } catch (error) {
      if (error instanceof RepositoryNotFoundError) return null;
      throw error;
    }
  }

  async listSamples(computeId: string, runId: string): Promise<BenchmarkSampleRecord[]> {
    return (await this.memory.findAll())
      .filter((record): record is BenchmarkSampleRecord =>
        record.kind === 'sample' && record.computeId === computeId && record.runId === runId)
      .sort((left, right) => left.observedAt.getTime() - right.observedAt.getTime());
  }

  async calculateReport(session: BenchmarkSessionRecord): Promise<{
    data: BenchmarkBumpData[];
    queryCount: number;
    failedQueryCount: number;
    averageUpdateTimeMs: number | null;
    peakUpdateTimeMs: number | null;
    totalFootprintBytes: number;
  }> {
    return this.memory.compute((records) => {
    const queries = records
      .filter((record): record is BenchmarkSampleRecord =>
        record.kind === 'sample' && record.computeId === session.computeId && record.runId === session.runId)
      .sort((left, right) => left.observedAt.getTime() - right.observedAt.getTime());
    const successful = queries.filter(({ status }) => status !== 'failed');
    const data: BenchmarkBumpData[] = session.instances.map((instance) => {
      const chart = successful
        .filter(({ sourceId }) => sourceId === instance.sourceId)
        .map(({ observedAt, updateTimeMs, footprintBytes }) => ({ observedAt, updateTimeMs, footprintBytes }));
      const average = chart.length
        ? chart.reduce((total, sample) => total + sample.updateTimeMs, 0) / chart.length
        : null;
      const deviations = average === null ? [] : chart.map((sample) => Math.abs(sample.updateTimeMs - average));
      const failedQueries = queries
        .filter(({ sourceId, status }) => sourceId === instance.sourceId && status === 'failed')
        .map(({ observedAt, updateTimeMs, errorMessage }) => ({ observedAt, elapsedMs: updateTimeMs, errorMessage }));
      const queryCount = chart.length + failedQueries.length;
      return {
        instance: {
          sourceId: instance.sourceId,
          name: instance.name,
          provider: instance.provider ?? 'unknown',
        },
        chart,
        failedQueries,
        table: {
          queries: queryCount,
          failedQueries: failedQueries.length,
          queryLossPercent: queryCount ? failedQueries.length / queryCount * 100 : null,
          footprintBytes: chart.at(-1)?.footprintBytes ?? null,
          averageUpdateTimeMs: average,
          meanDeviationMs: deviations.length
            ? deviations.reduce((total, deviation) => total + deviation, 0) / deviations.length
            : null,
          peakDeviationMs: deviations.length
            ? deviations.reduce((peak, deviation) => Math.max(peak, deviation), 0)
            : null,
        },
      };
    });
    const totalUpdateTime = successful.reduce((total, sample) => total + sample.updateTimeMs, 0);
    return {
      data,
      queryCount: queries.length,
      failedQueryCount: queries.length - successful.length,
      averageUpdateTimeMs: successful.length ? totalUpdateTime / successful.length : null,
      peakUpdateTimeMs: successful.length
        ? successful.reduce((peak, sample) => Math.max(peak, sample.updateTimeMs), 0)
        : null,
      totalFootprintBytes: data.reduce((total, instance) => total + (instance.table.footprintBytes ?? 0), 0),
    };
    });
  }

  async clearSamples(computeId: string): Promise<void> {
    const ids = (await this.memory.findAll())
      .filter((record) => record.kind === 'sample' && record.computeId === computeId)
      .map((record) => record.id);
    if (ids.length > 0) await this.memory.removeMany(ids);
  }

  async saveSession(session: BenchmarkSessionRecord): Promise<void> {
    if (await this.findSession(session.computeId)) {
      await this.memory.update(session.id, session);
    } else {
      await this.memory.create(session);
    }
  }

  async addSample(sample: BenchmarkSampleRecord): Promise<void> {
    await this.memory.create(sample);
  }

  async removeCompute(computeId: string): Promise<void> {
    const ids = (await this.memory.findAll())
      .filter((record) => record.computeId === computeId)
      .map((record) => record.id);
    if (ids.length > 0) await this.memory.removeMany(ids);
  }
}
