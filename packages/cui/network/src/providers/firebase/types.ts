import type { RepositorySortOrder } from "../core/query.js";
import type { CrudRepositoryPort, RepositoryReadPort } from "../core/repository.js";

export type FirebaseWhereOperator =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "not-in"
  | "array-contains-any";

export type FirebaseFilter<TData> = {
  [TKey in Extract<keyof TData, string>]: {
    field: TKey;
    operator: FirebaseWhereOperator;
    value: TData[TKey] | readonly TData[TKey][];
  };
}[Extract<keyof TData, string>];

export type FirebaseRepositoryQuery<TData, TId = string> = {
  limit: number;
  filters?: readonly FirebaseFilter<TData>[];
  orderBy?: Extract<keyof TData, string>;
  order?: RepositorySortOrder;
  next?: TId;
  before?: TId;
};

export type FirebasePageInfo<TId> = {
  limit: number;
  next?: TId;
  before?: TId;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type FirebaseCursorResult<TData, TId = string> = {
  data: TData[];
  pageInfo: FirebasePageInfo<TId>;
};

export interface FirebaseQueryPort<TData, TId = string>
  extends RepositoryReadPort<
    TData,
    TId,
    FirebaseRepositoryQuery<TData, TId>,
    FirebaseCursorResult<TData, TId>
  > {}

export interface FirebaseRepositoryPort<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
> extends CrudRepositoryPort<
    TData,
    TCreate,
    TUpdate,
    TId,
    FirebaseRepositoryQuery<TData, TId>,
    FirebaseCursorResult<TData, TId>
  > {}
