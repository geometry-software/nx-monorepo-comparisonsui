export type DataSourceProvider = "memory" | "mongodb" | "firebase";

export type VirtualDataSourceService = Readonly<{
  id: string;
  provider: DataSourceProvider;
  providerLabel: string;
  model: "period-value";
  collectionName: string;
}>;

export type DataSource = Readonly<{
  id: string;
  name: string;
  provider: DataSourceProvider;
  reused: boolean;
  service: VirtualDataSourceService;
  createdAt: string;
  updatedAt: string;
  updated?: string;
}>;

export type DataSourceElementBody = Readonly<{
  period: string;
  value: number;
}>;

export type DataSourceElement = Readonly<{
  id: string;
  body: DataSourceElementBody;
  createdAt: string;
  updatedAt: string;
}>;

export type DataSourceSummary = Readonly<{
  source: DataSource;
  meta?: Readonly<{
    description: string;
    label: string;
    collection: string;
    total: number;
    createdAt: string;
  }>;
  metaError?: string;
}>;

export type CreateDataSource = Readonly<{
  name: string;
  provider: DataSourceProvider;
  description: string;
}>;

export type PeriodUnit = "year" | "day";

export type PeriodModel = Readonly<{
  id: string;
  name: string;
  unit: PeriodUnit;
  values: string[];
}>;

export type Period = PeriodModel & Readonly<{ createdAt: string }>;

export type CreatePeriod = Readonly<{
  name: string;
  unit: PeriodUnit;
  values: string[];
}>;

export type Compute = Readonly<{
  id: string;
  name: string;
  description: string;
  sourceIds: string[];
  instanceCount: number;
  numericDataSizeBytes: number;
  periodModel: PeriodModel;
  comparisonModel: Readonly<{
    id: "period-value";
    fields: Readonly<{ period: "string"; value: "number" }>;
  }>;
  accountSessionId: number;
  createdAt: string;
  lastUpdatedAt: string;
}>;

export type ComputeSnapshot = Readonly<{
  compute: Compute;
  sources: DataSourceSummary[];
}>;

export type CreateCompute = Readonly<{
  name: string;
  description: string;
  sourceIds: string[];
  periodId: string;
  comparisonModelId: "period-value";
  accountSessionId: number;
}>;
