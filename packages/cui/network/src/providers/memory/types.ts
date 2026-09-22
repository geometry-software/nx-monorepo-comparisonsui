import type { RepositoryQuery } from "../core/query.js";
import type { CrudRepositoryPort } from "../core/repository.js";
import type { PaginatedResult } from "../core/types.js";

export type MemoryRepositoryQuery<TData> = RepositoryQuery & {
  filter?: Partial<TData>;
};

export interface MemoryQueryPort<TData> {
  findAll(query: MemoryRepositoryQuery<TData>): Promise<PaginatedResult<TData>>;
}

export interface MemoryRepositoryPort<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
> extends CrudRepositoryPort<TData, TCreate, TUpdate, TId>,
    MemoryQueryPort<TData> {}
