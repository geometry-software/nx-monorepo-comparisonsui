export type BenchmarkPdfMeasurement = {
  observedAt: number;
  updateTimeMs: number;
  footprintBytes: number;
};

export type BenchmarkPdfInstance = {
  sourceId: string;
  name: string;
  provider: string;
  samples: BenchmarkPdfMeasurement[];
  queryCount: number;
  failedQueryCount: number;
  footprintBytes: number | null;
  averageUpdateTimeMs: number | null;
  meanDeviationMs: number | null;
  peakDeviationMs: number | null;
};

export type BenchmarkPdfProviderSeries = {
  provider: string;
  instanceCount: number;
  values: Array<number | null>;
};

export type BenchmarkPdfReportModel = {
  serverName: string;
  startedAt: Date;
  stoppedAt: Date;
  generatedAt: Date;
  firstObservedAt: number;
  lastObservedAt: number;
  intervalSeconds: number;
  instances: BenchmarkPdfInstance[];
  providers: BenchmarkPdfProviderSeries[];
  failedQueriesByWindow: number[];
  averageUpdateTimeMs: number | null;
};
