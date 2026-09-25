import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { MongoDbCollectionRepositoryProvider } from '@cui/network/providers/mongodb';
import { randomUUID } from 'node:crypto';
import type { Collection } from 'mongodb';
import type { CreateDataSourceDto, DataSourceProvider, RepairSourceRegistrationDto } from '../data-source.dto.js';
import {
  providerLabel,
  toDataSource,
  type DataSource,
  type DataSourceSummary,
  type Observation,
  type ObservationStore,
} from '../data-source.models.js';
import type { SourceEntity } from '../entities/index.js';
import type { ObservationStoreFactory, ObservationStoreResult } from '../stores/types.js';
import { createObservationStore } from '../utils/create-observation-store.js';
import { getErrorMessage } from '../utils/get-error-message.js';
import {
  OBSERVATION_STORE_FACTORIES,
  SOURCE_MONGO_REPOSITORY_PROVIDER,
} from './repository.tokens.js';

export {
  OBSERVATION_STORE_FACTORIES,
  SOURCE_MONGO_REPOSITORY_PROVIDER,
} from './repository.tokens.js';

export type ObservationStoreFactories = ReadonlyMap<DataSourceProvider, ObservationStoreFactory>;

@Injectable()
export class SourceRepository implements OnModuleDestroy {
  private readonly stores = new Map<string, ObservationStore>();
  private collectionPromise?: Promise<Collection<SourceEntity>>;

  constructor(
    @Inject(SOURCE_MONGO_REPOSITORY_PROVIDER)
    private readonly mongo: MongoDbCollectionRepositoryProvider,
    @Inject(OBSERVATION_STORE_FACTORIES)
    private readonly storeFactories: ObservationStoreFactories,
  ) {}

  async findById(id: string): Promise<SourceEntity | null> {
    return (await this.getCollection()).findOne({ _id: id });
  }

  async findByName(name: string): Promise<SourceEntity | null> {
    return (await this.getCollection()).findOne({ name });
  }

  async findAll(): Promise<SourceEntity[]> {
    return (await this.getCollection()).find().sort({ createdAt: 1 }).toArray();
  }

  async countByIds(ids: string[]): Promise<number> {
    return (await this.getCollection()).countDocuments({ _id: { $in: ids } });
  }

  async missingIds(ids: string[]): Promise<string[]> {
    const uniqueIds = [...new Set(ids)];
    const registered = await (await this.getCollection())
      .find({ _id: { $in: uniqueIds } }, { projection: { _id: 1 } })
      .toArray();
    const registeredIds = new Set(registered.map(({ _id }) => _id));
    return uniqueIds.filter((id) => !registeredIds.has(id));
  }

  async repairRegistration(input: RepairSourceRegistrationDto): Promise<{
    previousId: string;
    sourceId: string;
    action: 'already-registered' | 'remapped' | 'recreated';
    message: string;
  }> {
    const name = input.name.trim();
    const existingById = await this.findById(input.sourceId);
    if (existingById) {
      if (existingById.name !== name || existingById.provider !== input.provider) {
        throw new ConflictException('The selected source ID belongs to a different registered source.');
      }
      return {
        previousId: input.sourceId,
        sourceId: existingById._id,
        action: 'already-registered',
        message: `${name} is already registered.`,
      };
    }
    const existingByName = await this.findByName(name);
    if (existingByName) {
      if (existingByName.provider !== input.provider) {
        throw new ConflictException(`Source ${name} is registered with a different provider.`);
      }
      return {
        previousId: input.sourceId,
        sourceId: existingByName._id,
        action: 'remapped',
        message: `${name} was matched to its current registry ID.`,
      };
    }
    const created = await this.createSource({
      name,
      provider: input.provider,
      description: input.description,
    });
    const summary = await this.getSource(created.id);
    const total = summary.meta?.total;
    return {
      previousId: input.sourceId,
      sourceId: created.id,
      action: 'recreated',
      message: input.provider === 'memory'
        ? `${name} was recreated as an empty in-memory collection; previous in-memory values cannot be recovered.`
        : `${name} was registered again with ${providerLabel(input.provider)}${total === undefined ? '' : `; ${total} data elements found`}.`,
    };
  }

  async create(source: SourceEntity): Promise<void> {
    await (await this.getCollection()).insertOne(source);
  }

  async delete(id: string): Promise<void> {
    await (await this.getCollection()).deleteOne({ _id: id });
  }

  async deleteMemorySources(): Promise<number> {
    const result = await (await this.getCollection()).deleteMany({ provider: 'memory' });
    return result.deletedCount;
  }

  async updateReuse(id: string, reused: boolean, updatedAt: Date): Promise<void> {
    await (await this.getCollection()).updateOne(
      { _id: id },
      { $set: { reused, updatedAt } },
    );
  }

  async markReset(id: string, updated: Date): Promise<void> {
    await (await this.getCollection()).updateOne(
      { _id: id },
      { $set: { reused: false, updatedAt: updated, updated } },
    );
  }

  async updateDescription(id: string, description: string, updated: Date): Promise<void> {
    await (await this.getCollection()).updateOne(
      { _id: id },
      { $set: { description, updatedAt: updated, updated } },
    );
  }

  async markUpdated(ids: string[], updated: Date): Promise<void> {
    await (await this.getCollection()).updateMany(
      { _id: { $in: ids } },
      { $set: { updatedAt: updated, updated } },
    );
  }

  async createSource(input: CreateDataSourceDto): Promise<DataSource> {
    const name = input.name.trim();
    const description = input.description?.trim() ??
      `${providerLabel(input.provider)} with period-value observations.`;
    if (['data_sources', 'source_maps'].includes(name)) {
      throw new ConflictException(`The ${name} name is reserved.`);
    }

    try {
      const existingRecord = await this.findByName(name);
      if (existingRecord) {
        if (existingRecord.provider !== input.provider) {
          throw new ConflictException(
            `Data source ${name} already uses the ${existingRecord.provider} provider.`,
          );
        }
        const store = await this.openStore(existingRecord);
        const reused = Boolean(existingRecord.reused) || (await store.getMeta()).total > 0;
        if (reused !== Boolean(existingRecord.reused)) {
          existingRecord.reused = reused;
          existingRecord.updatedAt = new Date();
          await this.updateReuse(existingRecord._id, reused, existingRecord.updatedAt);
        }
        if (existingRecord.description !== description) {
          await store.setDescription(description);
          const updated = new Date();
          await this.updateDescription(existingRecord._id, description, updated);
          existingRecord.description = description;
          existingRecord.updatedAt = updated;
          existingRecord.updated = updated;
        }
        return toDataSource(existingRecord);
      }

      const id = randomUUID();
      const now = new Date();
      const record: SourceEntity = {
        _id: id,
        name,
        description,
        provider: input.provider,
        collectionName: name,
        serviceId: `source-service:${id}`,
        reused: false,
        createdAt: now,
        updatedAt: now,
      };
      const { reused, store } = await this.createStore(record);
      await store.getMeta();
      await store.setDescription(description);
      record.reused = reused;
      await this.create(record);
      this.rememberStore(id, store);
      return toDataSource(record);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new ServiceUnavailableException(
        `The ${input.provider} data source could not be created: ${getErrorMessage(error)}`,
        { cause: error },
      );
    }
  }

  async listSources(): Promise<DataSourceSummary[]> {
    return Promise.all((await this.findAll()).map((record) => this.getSummary(record)));
  }

  async getSource(sourceId: string): Promise<DataSourceSummary> {
    return this.getSummary(await this.requireSource(sourceId));
  }

  async refreshSource(sourceId: string): Promise<DataSourceSummary> {
    const record = await this.requireSource(sourceId);
    return {
      source: toDataSource(record),
      meta: await (await this.openStore(record)).refreshMeta(),
    };
  }

  async listObservations(sourceId: string): Promise<Observation[]> {
    return (await this.openStore(await this.requireSource(sourceId))).list();
  }

  async updateSourceConnection(sourceId: string): Promise<{ updatedAt: Date }> {
    const store = await this.openStore(await this.requireSource(sourceId));
    return { updatedAt: await store.updateConnection() };
  }

  async getSourceConnection(sourceId: string): Promise<{ value: Date }> {
    const store = await this.openStore(await this.requireSource(sourceId));
    const value = await store.getConnectionUpdate();
    if (!value) throw new NotFoundException('The source update record was not found.');
    return { value };
  }

  async clearSourceData(record: SourceEntity): Promise<DataSourceSummary> {
    await (await this.openStore(record)).clearData();
    const updated = new Date();
    await this.markReset(record._id, updated);
    record.reused = false;
    record.updatedAt = updated;
    record.updated = updated;
    return this.getSummary(record);
  }

  async deleteSource(record: SourceEntity): Promise<{ deleted: true }> {
    await (await this.openStore(record)).delete();
    await this.delete(record._id);
    this.forgetStore(record._id);
    return { deleted: true };
  }

  async saveFieldValues(
    record: SourceEntity,
    values: Array<{ period: string; value: number }>,
    overwrite?: boolean,
  ): Promise<Observation[]> {
    const store = await this.openStore(record);
    const submitted = values.map(({ period }) => period);
    const existing = await store.list();
    if (!overwrite && existing.some(({ body }) => submitted.includes(body.period))) {
      throw new ConflictException(
        'This source already contains values for the selected period. Clear its data before saving new values.',
      );
    }
    try {
      return overwrite ? await store.replaceMany(values) : await store.createMany(values);
    } catch (error) {
      throw new ServiceUnavailableException(
        'The observation could not be stored by the selected provider.',
        { cause: error },
      );
    }
  }

  async requireSource(sourceId: string): Promise<SourceEntity> {
    const record = await this.findById(sourceId);
    if (!record) throw new NotFoundException(`Data source was not found: ${sourceId}`);
    return record;
  }

  private async getSummary(record: SourceEntity): Promise<DataSourceSummary> {
    const source = toDataSource(record);
    try {
      return { source, meta: await (await this.openStore(record)).getMeta() };
    } catch (error) {
      return { source, metaError: `Unable to load source metadata: ${getErrorMessage(error)}` };
    }
  }

  private createStore(source: SourceEntity): Promise<ObservationStoreResult> {
    return createObservationStore(this.storeFactories, source, true);
  }

  private rememberStore(id: string, store: ObservationStore): void {
    this.stores.set(id, store);
  }

  private async openStore(source: SourceEntity): Promise<ObservationStore> {
    const cached = this.stores.get(source._id);
    if (cached) return cached;
    const { store } = await createObservationStore(this.storeFactories, source, false);
    this.stores.set(source._id, store);
    return store;
  }

  private forgetStore(id: string): void {
    this.stores.delete(id);
  }

  private getCollection(): Promise<Collection<SourceEntity>> {
    this.collectionPromise ??= (async () => {
      const collection = await this.mongo.getCollection<SourceEntity>('data_sources');
      await collection.createIndex({ name: 1 }, { unique: true });
      return collection;
    })();
    return this.collectionPromise;
  }

  async onModuleDestroy(): Promise<void> {
    await this.mongo.close();
  }
}
