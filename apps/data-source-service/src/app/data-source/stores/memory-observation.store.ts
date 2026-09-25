import { createMemoryProvider } from "@cui/network/providers/memory";
import { RepositoryConflictError } from '@cui/network/providers/core';
import {
  COLLECTION_METADATA_RECORD_ID,
  COLLECTION_UPDATE_RECORD_ID,
  isCollectionDataRecordId,
} from '@cui/network/providers/core';
import { randomUUID } from "node:crypto";
import { createSourceMeta, type Observation, type SourceMeta } from "../data-source.models.js";
import type { SourceEntity } from "../entities/index.js";
import type {
  CreateObservationStoreOptions,
  ObservationStoreResult,
} from './types.js';

type ObservationInput = { period: string; value: number };
type ConnectionUpdateRecord = {
  id: typeof COLLECTION_UPDATE_RECORD_ID;
  value: Date;
  createdAt: Date;
  updatedAt: Date;
};
type MetadataRecord = SourceMeta & { id: typeof COLLECTION_METADATA_RECORD_ID };
type MemoryRecord = Observation | ConnectionUpdateRecord | MetadataRecord;
type MemoryInput = ObservationInput
  | { kind: "connection-update"; value: Date }
  | { kind: "metadata"; meta: SourceMeta };

export async function createMemoryObservationStore(
  source: SourceEntity,
  _options: CreateObservationStoreOptions,
): Promise<ObservationStoreResult> {
    const repository = createMemoryProvider<
      MemoryRecord,
      MemoryInput,
      Partial<MemoryRecord>
    >({
      options: {
        entityName: `${source.name} record`,
        searchableFields: ["id"],
        sortableFields: ["createdAt", "updatedAt"],
        defaultSort: "createdAt",
      },
      getId: ({ id }) => id,
      createId: (input) => "kind" in input
        ? input.kind === "metadata" ? COLLECTION_METADATA_RECORD_ID : COLLECTION_UPDATE_RECORD_ID
        : randomUUID(),
      create: (input, { id, now }) => "kind" in input
        ? input.kind === "metadata"
          ? { id: COLLECTION_METADATA_RECORD_ID, ...input.meta }
          : { id: COLLECTION_UPDATE_RECORD_ID, value: input.value, createdAt: now, updatedAt: now }
        : {
            id,
            body: { period: input.period, value: input.value },
            createdAt: now,
            updatedAt: now,
          },
      update: (current, changes, now) => {
        if (current.id === COLLECTION_METADATA_RECORD_ID) {
          return { ...current, ...changes, id: COLLECTION_METADATA_RECORD_ID } as MetadataRecord;
        }
        if (current.id === COLLECTION_UPDATE_RECORD_ID) {
          return "value" in changes
            ? { ...current, value: changes.value as Date, updatedAt: now }
            : current;
        }
        return "body" in changes && changes.body
          ? { ...current, body: changes.body, updatedAt: now }
          : current;
      },
    });
    await repository.create({ kind: "metadata", meta: createSourceMeta(source, 0) });
    return {
      reused: false,
      store: {
        async createMany(input) {
          const observations = await Promise.all(input.map(async (value) =>
            await repository.create(value) as Observation,
          ));
          const meta = await this.getMeta();
          await repository.update(COLLECTION_METADATA_RECORD_ID, { total: meta.total + observations.length });
          return observations;
        },
        async replaceMany(input) {
          const existing = await this.list();
          const byPeriod = new Map(existing.map((observation) => [observation.body.period, observation]));
          const observations: Observation[] = [];
          let added = 0;
          for (const value of input) {
            const current = byPeriod.get(value.period);
            if (current) {
              observations.push(await repository.update(current.id, { body: value }) as Observation);
            } else {
              observations.push(await repository.create(value) as Observation);
              added += 1;
            }
          }
          if (added) {
            const meta = await this.getMeta();
            await repository.update(COLLECTION_METADATA_RECORD_ID, { total: meta.total + added });
          }
          return observations;
        },
        async list() {
          return (await repository.findAll({ sort: "createdAt", order: "asc" }))
            .filter((record): record is Observation => isCollectionDataRecordId(record.id));
        },
        async getMeta() {
          const record = await repository.findOne(COLLECTION_METADATA_RECORD_ID) as MetadataRecord;
          return {
            description: record.description,
            label: record.label,
            collection: record.collection,
            total: record.total,
            createdAt: record.createdAt,
          };
        },
        async setDescription(description) {
          await repository.update(COLLECTION_METADATA_RECORD_ID, { description });
        },
        async refreshMeta() {
          return this.getMeta();
        },
        async updateConnection() {
          const now = new Date();
          const current = (await repository.findAll({ filter: { id: COLLECTION_UPDATE_RECORD_ID } }))[0];
          if (current) {
            await repository.update(COLLECTION_UPDATE_RECORD_ID, { value: now });
          } else {
            try {
              await repository.create({ kind: "connection-update", value: now });
            } catch (error) {
              if (!(error instanceof RepositoryConflictError)) throw error;
              await repository.update(COLLECTION_UPDATE_RECORD_ID, { value: now });
            }
          }
          return now;
        },
        async getConnectionUpdate() {
          const current = (await repository.findAll({ filter: { id: COLLECTION_UPDATE_RECORD_ID } }))[0];
          return current && "value" in current ? current.value : null;
        },
        async clearData() {
          await repository.removeMany((await repository.findAll())
            .filter(({ id }) => isCollectionDataRecordId(id))
            .map(({ id }) => id));
          await repository.update(COLLECTION_METADATA_RECORD_ID, { total: 0 });
        },
        async delete() {
          await repository.removeMany((await repository.findAll()).map(({ id }) => id));
        },
      },
    };
}
