import type { InjectionToken } from "@nestjs/common";
import type { CrudRepositoryPort } from "../core/repository.js";

export type RepositoryProviderName =
  "memory" | "mongodb" | "supabase" | "firebase";

export type RepositoryProviderRegistration<TData, TCreate, TUpdate> = {
  provider: RepositoryProviderName;
  repository: CrudRepositoryPort<TData, TCreate, TUpdate>;
};

export type DataRepositoryToken<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
> = InjectionToken<CrudRepositoryPort<TData, TCreate, TUpdate, TId>>;
