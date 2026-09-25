import type { BumpProvider } from '@cui/network/providers/bump';

export const BENCHMARK_BUMP_PROVIDER = Symbol('BENCHMARK_BUMP_PROVIDER');

export type BenchmarkBumpMeta = {
  report: 'benchmark-report' | 'last-activity-report';
  modelVersion: 5;
  serverId: string;
  serverName: string;
  runId: string;
  intervalSeconds: number;
  startedAt: Date;
  stoppedAt: Date;
  exportedAt: Date;
  instanceCount: number;
  queryCount: number;
  failedQueryCount: number;
  averageUpdateTimeMs: number | null;
  peakUpdateTimeMs: number | null;
  totalFootprintBytes: number;
  chart: { horizontalAxis: 'observedAt'; verticalAxis: 'updateTimeMs'; unit: 'ms' };
  providerComparison: { timeWindows: 24; method: 'mean-of-instance-means' };
  averageComparison: { baselineUpdateTimeMs: number | null; method: 'mean-of-successful-queries' };
};

export type BenchmarkBumpData = {
  instance: { sourceId: string; name: string; provider: string };
  chart: Array<{ observedAt: Date; updateTimeMs: number; footprintBytes: number }>;
  failedQueries: Array<{ observedAt: Date; elapsedMs: number; errorMessage?: string }>;
  table: {
    queries: number;
    failedQueries: number;
    queryLossPercent: number | null;
    footprintBytes: number | null;
    averageUpdateTimeMs: number | null;
    meanDeviationMs: number | null;
    peakDeviationMs: number | null;
  };
};

export type BenchmarkBumpProvider = BumpProvider<BenchmarkBumpMeta, BenchmarkBumpData>;
