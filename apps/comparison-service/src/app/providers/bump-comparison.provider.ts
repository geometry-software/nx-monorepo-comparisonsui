import type { BumpProvider } from '@cui/network/providers/bump';
import type { ComputeComparison, PearsonCorrelationCalculation } from '../compute-comparison.model';

export const BUMP_COMPARISON_PROVIDER = Symbol('BUMP_COMPARISON_PROVIDER');

export type BumpComparisonProvider = BumpProvider<Omit<ComputeComparison, 'pearsonCorrelations'>, PearsonCorrelationCalculation>;
