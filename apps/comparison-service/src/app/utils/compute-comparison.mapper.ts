import type { ComputeComparisonEntity } from '../compute-comparison.entity';
import type { ComputeComparison, PearsonCorrelationCalculation } from '../compute-comparison.model';

type LegacyComparisonPair = {
  leftEntity: string;
  rightEntity: string;
  r: number | null;
  observationCount: number;
  periods: string[];
  leftValues: number[];
  rightValues: number[];
};

export function toComputeComparison(entity: ComputeComparisonEntity): ComputeComparison {
  return {
    id: entity.id
      ? String(entity.id)
      : (entity as ComputeComparisonEntity & { computeId?: string }).computeId ?? '',
    provider: entity.provider ?? 'mongodb',
    name: entity.name,
    description: entity.description,
    accountSessionId: entity.accountSessionId,
    sourceCount: entity.sourceCount,
    comparisonModel: entity.comparisonModel,
    pearsonCorrelations: (
      entity.pearsonCorrelations ??
      (entity as ComputeComparisonEntity & { pairs?: LegacyComparisonPair[] }).pairs ??
      []
    ).map((pair: PearsonCorrelationCalculation | LegacyComparisonPair) => ({
      sourceA: 'sourceA' in pair ? pair.sourceA : pair.leftEntity,
      sourceB: 'sourceB' in pair ? pair.sourceB : pair.rightEntity,
      r: pair.r,
      observationCount: pair.observationCount,
      periods: pair.periods,
      sourceAValues: 'sourceAValues' in pair ? pair.sourceAValues : pair.leftValues,
      sourceBValues: 'sourceBValues' in pair ? pair.sourceBValues : pair.rightValues,
    })),
    createdAt: entity.createdAt,
  };
}
