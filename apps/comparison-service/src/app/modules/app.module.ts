import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { createMongoNestProvider, createMongoTypeOrmOptions, MONGO_PROVIDER_OPTIONS } from '@cui/network/providers/nest';
import type { MongoRepository } from 'typeorm';
import { existsSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { BumpProvider } from '@cui/network/providers/bump';
import { CorrelationInsightPdfProvider } from '@cui/network/providers/pdf';
import { ComparisonsController } from '../comparisons.controller';
import { CORRELATION_INSIGHT_PDF_PROVIDER, ComparisonsService } from '../comparisons.service';
import { ComputeComparisonEntity, type NewComputeComparison } from '../compute-comparison.entity';
import {
  BUMP_COMPARISON_PROVIDER,
  type BumpComparisonProvider,
  COMPUTE_COMPARISON_MONGO_REPOSITORY,
  ComputeComparisonRepository,
} from '../providers';

function getBumpDirectory(): string {
  let directory = process.cwd();
  while (!existsSync(join(directory, 'nx.json'))) {
    const parent = dirname(directory);
    if (parent === directory || directory === parse(directory).root) {
      throw new Error('The Nx workspace root could not be found for the Bump provider.');
    }
    directory = parent;
  }
  return join(directory, 'bump');
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...createMongoTypeOrmOptions(config, 'DATA_SOURCES_MONGODB_URI'),
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([ComputeComparisonEntity]),
  ],
  controllers: [ComparisonsController],
  providers: [
    {
      provide: CORRELATION_INSIGHT_PDF_PROVIDER,
      useFactory: () => new CorrelationInsightPdfProvider(),
    },
    {
      provide: BUMP_COMPARISON_PROVIDER,
      useFactory: (): BumpComparisonProvider => new BumpProvider(getBumpDirectory()),
    },
    {
      provide: MONGO_PROVIDER_OPTIONS,
      inject: [getRepositoryToken(ComputeComparisonEntity)],
      useFactory: (repository: MongoRepository<ComputeComparisonEntity>) => ({
        repository,
        options: {
          entityName: 'compute comparison',
          searchableFields: ['name'],
          sortableFields: ['createdAt'],
          defaultSort: 'createdAt',
        },
        create: (value: NewComputeComparison) =>
          Object.assign(new ComputeComparisonEntity(), value),
      }),
    },
    createMongoNestProvider<ComputeComparisonEntity, NewComputeComparison>(
      COMPUTE_COMPARISON_MONGO_REPOSITORY,
    ),
    ComputeComparisonRepository,
    ComparisonsService,
  ],
})
export class AppModule {}
