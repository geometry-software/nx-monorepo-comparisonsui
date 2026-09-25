import type { ComparisonModel } from './modules/comparison.definition';

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
