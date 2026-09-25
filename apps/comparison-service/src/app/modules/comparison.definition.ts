export type ComparisonDefinition = Readonly<{
  model: ComparisonModel;
  alignment: { field: 'period'; label: 'Period' };
  metric: {
    field: 'r';
    key: 'pearson';
    label: 'Pearson R';
    minimum: number;
    maximum: number;
    precision: number;
    emptyLabel: string;
  };
  table: {
    pairLabel: string;
    coverageLabel: string;
    pairSeparator: string;
  };
}>;

export type ComparisonModel = Readonly<{
  id: 'period-value';
  fields: Readonly<{ period: 'string'; value: 'number' }>;
}>;

export const periodValueComparisonModel: ComparisonModel = {
  id: 'period-value',
  fields: { period: 'string', value: 'number' },
};

export const comparisonDefinition: ComparisonDefinition = {
  model: periodValueComparisonModel,
  alignment: { field: 'period', label: 'Period' },
  metric: {
    field: 'r', key: 'pearson', label: 'Pearson R', minimum: -1, maximum: 1,
    precision: 4, emptyLabel: '—',
  },
  table: {
    pairLabel: 'Comparison', coverageLabel: 'Shared periods',
    pairSeparator: '–',
  },
};
