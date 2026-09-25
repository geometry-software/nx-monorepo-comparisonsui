import type { PageQuery, RepositorySortOrder } from "../core/query.js";
import type { CrudRepositoryPort, RepositoryReadPort } from "../core/repository.js";
import type { PaginatedResult } from "../core/types.js";

export type SupabaseFilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "in"
  | "is";

export type SupabaseFilter<TData> = {
  column: Extract<keyof TData, string>;
  operator: SupabaseFilterOperator;
  value: unknown;
};

export type SupabaseOrder<TData> = {
  column: Extract<keyof TData, string>;
  direction?: RepositorySortOrder;
};

export type SupabaseRepositoryQuery<TData> = PageQuery & {
  filters?: readonly SupabaseFilter<TData>[];
  order?: readonly SupabaseOrder<TData>[];
};

export interface SupabaseQueryPort<TData>
  extends RepositoryReadPort<
    TData,
    string,
    SupabaseRepositoryQuery<TData>,
    PaginatedResult<TData>
  > {}

export interface SupabaseRepositoryPort<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
> extends CrudRepositoryPort<
    TData,
    TCreate,
    TUpdate,
    TId,
    SupabaseRepositoryQuery<TData>,
    PaginatedResult<TData>
  > {}
