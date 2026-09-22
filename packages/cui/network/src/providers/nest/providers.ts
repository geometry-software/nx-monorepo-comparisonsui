import type { FactoryProvider, InjectionToken } from "@nestjs/common";
import type { ObjectLiteral } from "typeorm";
import {
  createFirebaseProvider,
  type FirebaseProviderOptions,
  type FirebaseRepositoryPort,
} from "../firebase/index.js";
import {
  createMemoryProvider,
  type MemoryProviderOptions,
  type MemoryRepositoryPort,
} from "../memory/index.js";
import {
  createMongoProvider,
  type MongoDbRepositoryPort,
  type MongoProviderOptions,
} from "../mongodb/index.js";
import {
  createSupabaseProvider,
  type SupabaseProviderOptions,
  type SupabaseRepositoryPort,
} from "../supabase/index.js";
import {
  DATA_REPOSITORY,
  FIREBASE_PROVIDER_OPTIONS,
  MEMORY_PROVIDER_OPTIONS,
  MONGO_PROVIDER_OPTIONS,
  SUPABASE_PROVIDER_OPTIONS,
} from "./tokens.js";

export function createMemoryNestProvider<
  TData,
  TCreate = TData,
  TUpdate = TCreate,
  TId = string,
>(
  repositoryToken: InjectionToken = DATA_REPOSITORY,
): FactoryProvider<MemoryRepositoryPort<TData, TCreate, TUpdate, TId>> {
  return {
    provide: repositoryToken,
    useFactory: (
      options: MemoryProviderOptions<TData, TCreate, TUpdate, TId>,
    ) => createMemoryProvider(options),
    inject: [MEMORY_PROVIDER_OPTIONS],
  };
}

export function createMongoNestProvider<
  TData extends ObjectLiteral,
  TCreate = TData,
  TUpdate = TCreate,
>(
  repositoryToken: InjectionToken = DATA_REPOSITORY,
): FactoryProvider<MongoDbRepositoryPort<TData, TCreate, TUpdate>> {
  return {
    provide: repositoryToken,
    useFactory: (options: MongoProviderOptions<TData, TCreate, TUpdate>) =>
      createMongoProvider(options),
    inject: [MONGO_PROVIDER_OPTIONS],
  };
}

export function createSupabaseNestProvider<
  TData extends object,
  TCreate extends object = TData,
  TUpdate extends object = TCreate,
>(
  repositoryToken: InjectionToken = DATA_REPOSITORY,
): FactoryProvider<SupabaseRepositoryPort<TData, TCreate, TUpdate>> {
  return {
    provide: repositoryToken,
    useFactory: (options: SupabaseProviderOptions<TData, TCreate, TUpdate>) =>
      createSupabaseProvider(options),
    inject: [SUPABASE_PROVIDER_OPTIONS],
  };
}

export function createFirebaseNestProvider<
  TData extends object,
  TCreate extends object = TData,
  TUpdate extends object = TCreate,
>(
  repositoryToken: InjectionToken = DATA_REPOSITORY,
): FactoryProvider<FirebaseRepositoryPort<TData, TCreate, TUpdate>> {
  return {
    provide: repositoryToken,
    useFactory: (options: FirebaseProviderOptions<TData, TCreate, TUpdate>) =>
      createFirebaseProvider(options),
    inject: [FIREBASE_PROVIDER_OPTIONS],
  };
}
