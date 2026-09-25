import { Inject, Injectable } from '@nestjs/common';
import type { MongoDbRepositoryPort } from '@cui/network/providers/mongodb';
import type { ComputeComparisonEntity, NewComputeComparison } from '../compute-comparison.entity';

export const COMPUTE_COMPARISON_MONGO_REPOSITORY = Symbol('COMPUTE_COMPARISON_MONGO_REPOSITORY');

@Injectable()
export class ComputeComparisonRepository {
  constructor(
    @Inject(COMPUTE_COMPARISON_MONGO_REPOSITORY)
    readonly mongo: MongoDbRepositoryPort<ComputeComparisonEntity, NewComputeComparison>,
  ) {}
}
