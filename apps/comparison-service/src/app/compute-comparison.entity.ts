import { Column, Entity, ObjectIdColumn } from 'typeorm';
import type { ComparisonModel } from './modules/comparison.definition';
import type { ComputeComparison, PearsonCorrelationCalculation } from './compute-comparison.model';

@Entity('compute_comparisons')
export class ComputeComparisonEntity {
  @ObjectIdColumn()
  id!: string;

  @Column()
  provider!: 'mongodb' | 'bump';

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column()
  accountSessionId!: number;

  @Column()
  sourceCount!: number;

  @Column()
  comparisonModel!: ComparisonModel;

  @Column()
  pearsonCorrelations!: PearsonCorrelationCalculation[];

  @Column()
  createdAt!: string;
}

export type NewComputeComparison = ComputeComparison;
