export type BenchmarkSample = Readonly<{
  sourceId: string;
  footprintBytes: number;
  updateTimeMs: number;
  observedAt: string;
  status: "success" | "failed";
  errorMessage?: string;
}>;

export type Benchmark = Readonly<{
  computeId: string;
  computeName: string;
  runId: string;
  status: "recording" | "stopped";
  intervalSeconds: number;
  startedAt: string;
  stoppedAt?: string;
  instances: ReadonlyArray<Readonly<{ sourceId: string; name: string; provider?: "memory" | "mongodb" | "firebase" }>>;
  samples: BenchmarkSample[];
}>;

export type BenchmarkStatus = Pick<Benchmark, 'runId' | 'status'>;

export type BenchmarkReport = Readonly<{
  servers: ReadonlyArray<Benchmark>;
}>;

export type RecordBenchmarkSample = Readonly<{
  runId: string;
  sourceId: string;
  footprintBytes?: number;
  updateTimeMs: number;
  observedAt: string;
  status: "success" | "failed";
  errorMessage?: string;
}>;
