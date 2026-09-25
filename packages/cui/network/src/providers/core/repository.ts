import type { BulkDeleteResult } from "./types.js";

export interface RepositoryReadPort<
  TData,
  TId = string,
  TQuery = never,
  TQueryResult = TData[],
> {
  findAll(): Promise<TData[]>;
  findAll(query: TQuery): Promise<TQueryResult>;
  findOne(id: TId): Promise<TData>;
}

export interface RepositoryCreatePort<TData, TCreate = TData> {
  create(value: TCreate): Promise<TData>;
}

export interface RepositoryUpdatePort<TData, TUpdate, TId = string> {
  update(id: TId, value: TUpdate): Promise<TData>;
}

export interface RepositoryDeletePort<TId = string> {
  remove(id: TId): Promise<{ deleted: true }>;
  removeMany(ids: TId[]): Promise<BulkDeleteResult>;
}

export interface CrudRepositoryPort<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
  TQuery = never,
  TQueryResult = TData[],
> extends RepositoryReadPort<TData, TId, TQuery, TQueryResult>,
    RepositoryCreatePort<TData, TCreate>,
    RepositoryUpdatePort<TData, TUpdate, TId>,
    RepositoryDeletePort<TId> {}
