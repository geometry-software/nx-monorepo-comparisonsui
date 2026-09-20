export type ComparisonSourceKey = 'Year' | 'TGI';

export type ComparisonSourceDefinition = Readonly<{
  key: ComparisonSourceKey;
  urlKey: string;
  fallback: string;
  valueField: 'year' | 'value';
}>;

export const comparisonSources = [
  {
    key: 'Year',
    urlKey: 'YEARS_SERVICE_URL',
    fallback: 'http://localhost:3010',
    valueField: 'year',
  },
  {
    key: 'TGI',
    urlKey: 'TGI_SERVICE_URL',
    fallback: 'http://localhost:3012',
    valueField: 'value',
  },
] as const satisfies readonly ComparisonSourceDefinition[];

export type ComparisonDefinition = Readonly<{
  sources: ReadonlyArray<{ key: ComparisonSourceKey; label: string }>;
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
}>;

export function createComparisonDefinition(
  sources: readonly ComparisonSourceDefinition[],
): ComparisonDefinition {
  return {
    sources: sources.map(({ key }) => ({ key, label: key })),
    pairCount: (sources.length * (sources.length - 1)) / 2,
    alignment: { field: 'year', label: 'Year' },
    metric: {
      field: 'r', key: 'pearson', label: 'Pearson R', minimum: -1, maximum: 1,
      precision: 4, emptyLabel: '—',
    },
    table: {
      idLabel: 'ID', pairLabel: 'Comparison', coverageLabel: 'Shared years',
      pairSeparator: '–',
    },
  };
}
