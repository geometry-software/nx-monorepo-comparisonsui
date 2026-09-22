import type { RepositoryQuery } from "../core/query.js";
import type { CrudRepositoryPort } from "../core/repository.js";
import type { PaginatedResult } from "../core/types.js";

export type MongoDbFieldFilter<TValue> =
  | TValue
  | {
      $eq?: TValue;
      $in?: readonly TValue[];
      $gt?: TValue;
      $gte?: TValue;
      $lt?: TValue;
      $lte?: TValue;
    };

export type MongoDbRepositoryQuery<TData> = RepositoryQuery & {
  filter?: Partial<{
    [TKey in keyof TData]: MongoDbFieldFilter<TData[TKey]>;
  }>;
};

export interface MongoDbQueryPort<TData> {
  findAll(
    query: MongoDbRepositoryQuery<TData>,
  ): Promise<PaginatedResult<TData>>;
}

export interface MongoDbRepositoryPort<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
> extends CrudRepositoryPort<TData, TCreate, TUpdate, TId>,
    MongoDbQueryPort<TData> {}
