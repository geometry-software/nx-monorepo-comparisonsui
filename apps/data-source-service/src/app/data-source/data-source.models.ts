import type { DataSourceProvider } from "./data-source.dto.js";
import type { SourceEntity } from "./entities/index.js";

export type DataSource = {
  id: string;
  name: string;
  provider: DataSourceProvider;
  reused: boolean;
  service: {
    id: string;
    provider: DataSourceProvider;
    providerLabel: string;
    model: "period-value";
    collectionName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  updated?: Date;
};

export type Observation = {
  id: string;
  body: {
    period: string;
    value: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export interface ObservationStore {
  createMany(input: Array<{ period: string; value: number }>): Promise<Observation[]>;
  replaceMany(input: Array<{ period: string; value: number }>): Promise<Observation[]>;
  list(): Promise<Observation[]>;
  getMeta(): Promise<SourceMeta>;
  setDescription(description: string): Promise<void>;
  refreshMeta(): Promise<SourceMeta>;
  updateConnection(): Promise<Date>;
  getConnectionUpdate(): Promise<Date | null>;
  clearData(): Promise<void>;
  delete(): Promise<void>;
}

export type DataSourceSummary = {
  source: DataSource;
  meta?: SourceMeta;
  metaError?: string;
};

export type SourceMeta = {
  description: string;
  label: string;
  collection: string;
  total: number;
  createdAt: Date;
};

export function createSourceMeta(source: SourceEntity, total: number): SourceMeta {
  return {
    description: source.description ?? `${providerLabel(source.provider)} with period-value observations.`,
    label: source.name,
    collection: source.collectionName,
    total,
    createdAt: source.createdAt,
  };
}

export type Compute = {
  id: string;
  name: string;
  description: string;
  sourceIds: string[];
  instanceCount: number;
  numericDataSizeBytes: number;
  periodModel: PeriodModel;
  comparisonModel: ComparisonModel;
  accountSessionId: number;
  createdAt: Date;
  lastUpdatedAt: Date;
};

export type ComputeSnapshot = {
  compute: Compute;
  sources: DataSourceSummary[];
};

export type ComparisonModel = {
  id: "period-value";
  fields: { period: "string"; value: "number" };
};

export const PERIOD_VALUE_COMPARISON_MODEL: ComparisonModel = {
  id: "period-value",
  fields: { period: "string", value: "number" },
};

export type PeriodUnit = "year" | "day";

export type Period = {
  id: string;
  name: string;
  unit: PeriodUnit;
  values: string[];
  createdAt: Date;
};

export type PeriodModel = Pick<Period, "id" | "name" | "unit" | "values">;

export function toDataSource(record: SourceEntity): DataSource {
  return {
    id: record._id,
    name: record.name,
    provider: record.provider,
    reused: Boolean(record.reused),
    service: {
      id: record.serviceId,
      provider: record.provider,
      providerLabel: providerLabel(record.provider),
      model: "period-value",
      collectionName: record.collectionName,
    },
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    updated: record.updated,
  };
}

export function providerLabel(provider: DataSourceProvider): string {
  switch (provider) {
    case "memory":
      return "In-memory Collection";
    case "mongodb":
      return "MongoDB Atlas";
    case "firebase":
      return "Firebase Store";
  }
}

export function normalizeDate(value: unknown): Date {
  if (value instanceof Date) return value;
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }
  return new Date(String(value));
}
