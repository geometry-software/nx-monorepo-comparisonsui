import { Module } from "@nestjs/common";
import { existsSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BumpProvider } from '@cui/network/providers/bump';
import { BenchmarkPdfReportProvider } from '@cui/network/providers/pdf';
import { FirebaseConnectionProvider } from '@cui/network/providers/firebase';
import { MongoDbCollectionRepositoryProvider } from '@cui/network/providers/mongodb';
import { createMemoryProvider, type MemoryProviderOptions } from '@cui/network/providers/memory';
import { createMemoryNestProvider, MEMORY_PROVIDER_OPTIONS } from '@cui/network/providers/nest';
import { DataSourceController } from "./data-source/data-source.controller.js";
import { ComputeController } from './data-source/compute.controller.js';
import { BenchmarkController } from './data-source/benchmark.controller.js';
import { DataSourceService } from "./data-source/index.js";
import type { Compute } from './data-source/data-source.models.js';
import type { BenchmarkRecord, BenchmarkSessionRecord } from './data-source/benchmark.models.js';
import {
  BENCHMARK_BUMP_PROVIDER,
  type BenchmarkBumpProvider,
} from './data-source/benchmark-bump.provider.js';
import { BENCHMARK_GROUP_BUMP_PROVIDER, type BenchmarkGroupBumpProvider } from './data-source/benchmark-group-bump.provider.js';
import type { DataSourceProvider } from './data-source/data-source.dto.js';
import {
  ComputeRepository,
  BenchmarkRepository,
  BENCHMARK_MEMORY_REPOSITORY_PROVIDER,
  COMPUTE_MEMORY_REPOSITORY_PROVIDER,
  OBSERVATION_STORE_FACTORIES,
  PeriodRepository,
  SourceRepository,
  SOURCE_MONGO_REPOSITORY_PROVIDER,
} from './data-source/repositories/index.js';
import { AccountSessionVerifierService } from './data-source/services/account-session-verifier.service.js';
import { BenchmarkFileSystemService } from './data-source/services/benchmark-file-system.service.js';
import {
  BENCHMARK_PDF_PROVIDER,
  BenchmarkService,
} from './data-source/services/benchmark.service.js';
import {
  SERVER_MODEL_BUMP_PROVIDER,
  ServerModelService,
  type ServerModelBumpProvider,
} from './data-source/services/server-model.service.js';
import { createFirebaseObservationStore } from './data-source/stores/firebase-observation.store.js';
import { createMemoryObservationStore } from './data-source/stores/memory-observation.store.js';
import { createMongoDbObservationStore } from './data-source/stores/mongodb-observation.store.js';
import type { ObservationStoreFactory } from './data-source/stores/types.js';

const FIREBASE_CONNECTION_PROVIDER = Symbol('FIREBASE_CONNECTION_PROVIDER');

function getBumpDirectory(name: string): string {
  let directory = process.cwd();
  while (!existsSync(join(directory, 'nx.json'))) {
    const parent = dirname(directory);
    if (parent === directory || directory === parse(directory).root) {
      throw new Error('The Nx workspace root could not be found for the Bump provider.');
    }
    directory = parent;
  }
  return join(directory, 'bump', name);
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
  controllers: [ComputeController, DataSourceController, BenchmarkController],
  providers: [
    {
      provide: SOURCE_MONGO_REPOSITORY_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new MongoDbCollectionRepositoryProvider(
        config.getOrThrow<string>('DATA_SOURCES_MONGODB_URI'),
      ),
    },
    {
      provide: FIREBASE_CONNECTION_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new FirebaseConnectionProvider({
        apiKey: config.getOrThrow<string>('FIREBASE_API_KEY'),
        authDomain: config.get<string>('FIREBASE_AUTH_DOMAIN'),
        projectId: config.getOrThrow<string>('FIREBASE_PROJECT_ID'),
        storageBucket: config.get<string>('FIREBASE_STORAGE_BUCKET'),
        messagingSenderId: config.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
        appId: config.get<string>('FIREBASE_APP_ID'),
      }, 'data-source-service'),
    },
    {
      provide: OBSERVATION_STORE_FACTORIES,
      inject: [SOURCE_MONGO_REPOSITORY_PROVIDER, FIREBASE_CONNECTION_PROVIDER],
      useFactory: (
        mongo: MongoDbCollectionRepositoryProvider,
        firebase: FirebaseConnectionProvider,
      ) => new Map<DataSourceProvider, ObservationStoreFactory>([
        ['memory', createMemoryObservationStore],
        ['mongodb', (source, options) => createMongoDbObservationStore(mongo, source, options)],
        ['firebase', (source, options) => createFirebaseObservationStore(firebase, source, options)],
      ]),
    },
    {
      provide: AccountSessionVerifierService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new AccountSessionVerifierService({
        url: config.getOrThrow<string>('SUPABASE_URL'),
        publishableKey: config.getOrThrow<string>('SUPABASE_PUBLISHABLE_KEY'),
      }),
    },
    SourceRepository,
    PeriodRepository,
    {
      provide: MEMORY_PROVIDER_OPTIONS,
      useValue: {
        options: {
          entityName: 'compute',
          searchableFields: ['name'],
          sortableFields: ['createdAt', 'name'],
          defaultSort: 'createdAt',
        },
        getId: (compute: Compute) => compute.id,
        createId: (compute: Compute) => compute.id,
        create: (compute: Compute) => compute,
        update: (current: Compute, changes: Partial<Compute>) => ({ ...current, ...changes }),
      } satisfies MemoryProviderOptions<Compute, Compute, Partial<Compute>>,
    },
    createMemoryNestProvider<Compute, Compute, Partial<Compute>>(
      COMPUTE_MEMORY_REPOSITORY_PROVIDER,
    ),
    ComputeRepository,
    {
      provide: BENCHMARK_MEMORY_REPOSITORY_PROVIDER,
      useFactory: () => createMemoryProvider<
        BenchmarkRecord,
        BenchmarkRecord,
        BenchmarkSessionRecord
      >({
        options: {
          entityName: 'benchmark',
          searchableFields: [],
          sortableFields: ['createdAt'],
          defaultSort: 'createdAt',
        },
        getId: (record) => record.id,
        createId: (record) => record.id,
        create: (record) => record,
        update: (_current, session) => session,
      }),
    },
    BenchmarkRepository,
    {
      provide: BENCHMARK_BUMP_PROVIDER,
      useFactory: (): BenchmarkBumpProvider => new BumpProvider(getBumpDirectory('Benchmark Report')),
    },
    {
      provide: BENCHMARK_GROUP_BUMP_PROVIDER,
      useFactory: (): BenchmarkGroupBumpProvider => new BumpProvider(getBumpDirectory('Benchmark Report')),
    },
    {
      provide: SERVER_MODEL_BUMP_PROVIDER,
      useFactory: (): ServerModelBumpProvider => new BumpProvider(getBumpDirectory('Server Models')),
    },
    {
      provide: BENCHMARK_PDF_PROVIDER,
      useFactory: () => new BenchmarkPdfReportProvider(),
    },
    BenchmarkService,
    ServerModelService,
    BenchmarkFileSystemService,
    DataSourceService,
  ],
})
export class AppModule {}
