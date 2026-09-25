# `@cui/network`

Framework-independent repository contracts and data providers for CUI packages and applications.

## Public API

Use package entry points. Imports from `src` or `dist` are internal and unsupported.

```ts
import type { CrudRepositoryPort } from "@cui/network/providers/core";
import { createMemoryProvider } from "@cui/network/providers/memory";
import { createMongoProvider } from "@cui/network/providers/mongodb";
import { createSupabaseProvider } from "@cui/network/providers/supabase";
import { createFirebaseProvider } from "@cui/network/providers/firebase";
```

The convenience entry point `@cui/network/providers` exports the core contract and all four framework-independent providers. NestJS integration has its own entry point:

```ts
import {
  DATA_REPOSITORY,
  MONGO_PROVIDER_OPTIONS,
  createMongoNestProvider,
} from "@cui/network/providers/nest";
```

## Core contract

`CrudRepositoryPort<TData, TCreate, TUpdate, TId>` defines `create`, `findAll`, `findOne`, `update`, `remove`, and `removeMany`. Calling `findAll()` without arguments returns all records as `Promise<TData[]>` in every provider. Provider query ports retain their query overloads because pagination and filtering differ between data stores.

The files under `providers/core` have no NestJS imports. Repository errors and codecs are also framework-independent.

## Providers

### Memory

`createMemoryProvider(options)` stores values in a process-local map. The application supplies ID, create, and update functions. `findAll()` returns the complete matching list with optional filtering, search, and ordering; the Memory provider does not paginate results.

### MongoDB

`createMongoProvider(options)` adapts an existing TypeORM `MongoRepository`. The application owns connection setup and injects the repository in the provider options. It supports MongoDB filters, search, ordering, and offset pagination through `MongoDbRepositoryPort`.

### Supabase

`createSupabaseProvider(options)` accepts an existing `SupabaseClient`, table name, repository metadata, and an optional codec. `SupabaseRepositoryPort` uses page/limit pagination and typed PostgREST filters and ordering.

### Firebase

`createFirebaseProvider(options)` accepts an existing Firestore instance, collection name, repository metadata, and an optional codec. `FirebaseRepositoryPort` adds Firestore cursor pagination with `next` and `before` IDs.

## NestJS integration

NestJS code is isolated under `providers/nest`. Each helper returns a standard Nest `FactoryProvider`. Configuration remains in the consuming application as a `useValue` or `useFactory` provider.

```ts
import { Inject, Injectable, Module } from "@nestjs/common";
import type {
  MongoProviderOptions,
  CrudRepositoryPort,
} from "@cui/network/providers";
import {
  DATA_REPOSITORY,
  MONGO_PROVIDER_OPTIONS,
  createMongoNestProvider,
} from "@cui/network/providers/nest";

@Module({
  providers: [
    {
      provide: MONGO_PROVIDER_OPTIONS,
      useValue: {
        repository: mongoRepository,
        options: {
          entityName: "Item",
          searchableFields: ["name"],
          sortableFields: ["name", "createdAt"],
          defaultSort: "createdAt",
        },
        create: (value) => value,
      } satisfies MongoProviderOptions<Item, CreateItem, UpdateItem>,
    },
    createMongoNestProvider<Item, CreateItem, UpdateItem>(),
  ],
  exports: [DATA_REPOSITORY],
})
export class DataModule {}

@Injectable()
export class SomeService {
  constructor(
    @Inject(DATA_REPOSITORY)
    private readonly repository: CrudRepositoryPort<
      Item,
      CreateItem,
      UpdateItem
    >,
  ) {}
}
```

Equivalent helpers and option tokens are available for every provider:

| Provider | Options token | Factory provider helper |
| --- | --- | --- |
| Memory | `MEMORY_PROVIDER_OPTIONS` | `createMemoryNestProvider()` |
| MongoDB | `MONGO_PROVIDER_OPTIONS` | `createMongoNestProvider()` |
| Supabase | `SUPABASE_PROVIDER_OPTIONS` | `createSupabaseNestProvider()` |
| Firebase | `FIREBASE_PROVIDER_OPTIONS` | `createFirebaseNestProvider()` |

Pass a custom repository token to a helper when one module needs more than one repository:

```ts
const ITEMS_REPOSITORY = Symbol("ITEMS_REPOSITORY");

createMongoNestProvider<Item, CreateItem, UpdateItem>(ITEMS_REPOSITORY);
```

## Adding another provider

1. Add a folder under `src/providers/<provider>` with its provider-specific query port, options, and factory.
2. Implement the core `CrudRepositoryPort`; keep SDK details and query behavior in that provider folder.
3. Export the folder through a package subpath and the framework-independent providers barrel.
4. Add an options token and a thin factory-provider helper under `providers/nest`; call the framework-independent factory from it.
5. Run the reusable repository conformance suite for the new implementation and add focused tests for provider-specific queries.
