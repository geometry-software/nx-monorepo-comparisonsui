import type { BumpProvider } from '@cui/network/providers/bump';
import type { BenchmarkBumpData, BenchmarkBumpMeta } from './benchmark-bump.provider.js';

export const BENCHMARK_GROUP_BUMP_PROVIDER = Symbol('BENCHMARK_GROUP_BUMP_PROVIDER');

export type BenchmarkGroupBumpMeta = {
  report: 'benchmark-group';
  modelVersion: 1;
  serverCount: number;
  exportedAt: Date;
};

export type BenchmarkGroupBumpData = {
  server: BenchmarkBumpMeta;
  instances: BenchmarkBumpData[];
};

export type BenchmarkGroupBumpProvider = BumpProvider<BenchmarkGroupBumpMeta, BenchmarkGroupBumpData>;
