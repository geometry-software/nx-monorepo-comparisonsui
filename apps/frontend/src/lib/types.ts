export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export type Page<T> = { data: T[]; meta: Meta };
export type BulkDeleteResponse = { deleted: number };
export type SeriesKey = 'years' | 'tgi';
export type SeriesObservation = {
  id: string;
  year: number;
  value?: number;
  createdAt: string;
  updatedAt: string;
};
export type Comparison = {
  id: string;
  pairKey: string;
  leftEntity: string;
  rightEntity: string;
  r: number | null;
  observationCount: number;
  years: number[];
  leftValues: number[];
  rightValues: number[];
  createdAt: string;
  updatedAt: string;
};
export type ComparisonDefinition = {
  sources: Array<{ key: string; label: string }>;
  pairCount: number;
  alignment: { field: 'year'; label: string };
  metric: {
    field: 'r';
    key: 'pearson';
    label: string;
    minimum: -1;
    maximum: 1;
    precision: number;
    emptyLabel: string;
  };
  table: {
    idLabel: string;
    pairLabel: string;
    coverageLabel: string;
    pairSeparator: string;
  };
};
