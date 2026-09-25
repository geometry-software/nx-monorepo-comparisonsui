import type { DataSourceProvider } from './data-source.dto.js';

export type BenchmarkInstance = {
  sourceId: string;
  name: string;
  provider?: DataSourceProvider;
};

export type BenchmarkSessionRecord = {
  id: string;
  kind: 'session';
  computeId: string;
  computeName: string;
  runId: string;
  status: 'recording' | 'stopped';
  intervalSeconds: number;
  startedAt: Date;
  stoppedAt?: Date;
  instances: BenchmarkInstance[];
  createdAt: Date;
};

export type BenchmarkSampleRecord = {
  id: string;
  kind: 'sample';
  computeId: string;
  runId: string;
  sourceId: string;
  footprintBytes: number;
  updateTimeMs: number;
  observedAt: Date;
  status: 'success' | 'failed';
  errorMessage?: string;
  createdAt: Date;
};

export type BenchmarkRecord = BenchmarkSessionRecord | BenchmarkSampleRecord;

export type Benchmark = Pick<
  BenchmarkSessionRecord,
  'computeId' | 'computeName' | 'runId' | 'status' | 'intervalSeconds' | 'startedAt' | 'stoppedAt' | 'instances'
> & {
  samples: Array<Pick<
    BenchmarkSampleRecord,
    'sourceId' | 'footprintBytes' | 'updateTimeMs' | 'observedAt' | 'status' | 'errorMessage'
  >>;
};

export type BenchmarkReport = {
  servers: Benchmark[];
};
