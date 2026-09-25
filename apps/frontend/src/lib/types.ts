export type PearsonCorrelationCalculation = {
  sourceA: string;
  sourceB: string;
  r: number | null;
  observationCount: number;
  periods: string[];
  sourceAValues: number[];
  sourceBValues: number[];
};
export type ComputeComparison = {
  id: string;
  provider: 'mongodb' | 'bump';
  name: string;
  description?: string;
  accountSessionId: number;
  sourceCount: number;
  comparisonModel: ComparisonModel;
  pearsonCorrelations: PearsonCorrelationCalculation[];
  createdAt: string;
};
export type ComparisonModel = {
  id: 'period-value';
  fields: { period: 'string'; value: 'number' };
};
export type ComparisonDefinition = {
  model: ComparisonModel;
  alignment: { field: 'period'; label: string };
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
    pairLabel: string;
    coverageLabel: string;
    pairSeparator: string;
  };
};
