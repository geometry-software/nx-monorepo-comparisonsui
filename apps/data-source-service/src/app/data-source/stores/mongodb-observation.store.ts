import {
  ObjectId,
  type Collection,
  type Db,
  type Document,
} from "mongodb";
import type { MongoDbCollectionRepositoryProvider } from '@cui/network/providers/mongodb';
import {
  COLLECTION_METADATA_RECORD_ID,
  COLLECTION_UPDATE_RECORD_ID,
} from '@cui/network/providers/core';
import type { ObservationStore } from "../data-source.models.js";
import type { SourceEntity } from "../entities/index.js";
import { createSourceMeta, normalizeDate } from "../data-source.models.js";
import type {
  CreateObservationStoreOptions,
  ObservationStoreResult,
} from './types.js';

export async function createMongoDbObservationStore(
  mongo: MongoDbCollectionRepositoryProvider,
  source: SourceEntity,
  options: CreateObservationStoreOptions,
): Promise<ObservationStoreResult> {
    const database = await mongo.getDatabase();
    const exists = await database
      .listCollections({ name: source.collectionName }, { nameOnly: true })
      .hasNext();
    if (!exists) await database.createCollection(source.collectionName);
    const collection = database.collection(source.collectionName);
    const reused =
      options.createPhysicalSource && exists
        ? (await collection.countDocuments(
            { $or: [{ "body.period": { $exists: true } }, { year: { $exists: true } }] },
            { limit: 1 },
          )) > 0
        : false;
    const legacyIndex = (await collection.indexes()).find(({ key }) => key.year === 1);
    if (legacyIndex?.name) await collection.dropIndex(legacyIndex.name);
    await collection.createIndex(
      { "body.period": 1 },
      { unique: true, partialFilterExpression: { "body.period": { $exists: true } } },
    );
    return { store: createMongoDbStore(collection, source, database), reused };
}

function createMongoDbStore(
  collection: Collection<Document>,
  source: SourceEntity,
  database: Db,
): ObservationStore {
  return {
    async createMany(input) {
      await this.getMeta();
      const now = new Date();
      const result = await collection.insertMany(input.map(({ period, value }) => ({
        body: { period, value }, createdAt: now, updatedAt: now,
      })));
      await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $inc: { total: input.length } });
      return input.map(({ period, value }, index) => ({
        id: result.insertedIds[index].toHexString(),
        body: { period, value },
        createdAt: now,
        updatedAt: now,
      }));
    },
    async replaceMany(input) {
      await this.getMeta();
      const now = new Date();
      const result = await collection.bulkWrite(input.map(({ period, value }) => ({
        updateOne: {
          filter: { $or: [{ "body.period": period }, { year: period }] },
          update: {
            $set: { body: { period, value }, updatedAt: now },
            $setOnInsert: { createdAt: now },
            $unset: { year: "", value: "" },
          },
          upsert: true,
        },
      })));
      if (result.upsertedCount) {
        await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $inc: { total: result.upsertedCount } });
      }
      const documents = await collection.find({ "body.period": { $in: input.map(({ period }) => period) } }).toArray();
      const byPeriod = new Map(documents.map((document) => [String(document.body.period), document]));
      return input.map(({ period, value }) => {
        const document = byPeriod.get(period);
        if (!document) throw new Error(`The value for period ${period} was not saved.`);
        return {
          id: document._id instanceof ObjectId ? document._id.toHexString() : String(document._id),
          body: { period, value },
          createdAt: normalizeDate(document.createdAt),
          updatedAt: normalizeDate(document.updatedAt),
        };
      });
    },
    async list() {
      const documents = await collection
        .find({
          _id: { $nin: [COLLECTION_METADATA_RECORD_ID, COLLECTION_UPDATE_RECORD_ID] },
          $or: [{ "body.period": { $exists: true } }, { year: { $exists: true } }],
        })
        .sort({ createdAt: 1 })
        .toArray();
      return documents.map((document) => ({
        id:
          document._id instanceof ObjectId
            ? document._id.toHexString()
            : String(document._id),
        body: {
          period: String(document.body?.period ?? document.year),
          value: Number(document.body?.value ?? document.value),
        },
        createdAt: normalizeDate(document.createdAt),
        updatedAt: normalizeDate(document.updatedAt),
      }));
    },
    async getMeta() {
      const marker = await collection.findOne({ _id: COLLECTION_METADATA_RECORD_ID });
      if (marker?.Update) {
        await collection.updateOne(
          { _id: COLLECTION_UPDATE_RECORD_ID },
          { $setOnInsert: { value: normalizeDate(marker.Update) } },
          { upsert: true },
        );
        await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $unset: { Update: "" } });
      }
      if (marker && typeof marker.total === "number" && Number.isFinite(marker.total)) {
        return {
          description: String(marker.description ?? ""),
          label: String(marker.label ?? source.name),
          collection: String(marker.collection ?? source.collectionName),
          total: marker.total,
          createdAt: normalizeDate(marker.createdAt ?? source.createdAt),
        };
      }
      const total = await collection.countDocuments({ $or: [{ "body.period": { $exists: true } }, { year: { $exists: true } }] });
      const meta = createSourceMeta(source, total);
      await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $set: meta }, { upsert: true });
      return meta;
    },
    async setDescription(description) {
      await this.getMeta();
      await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $set: { description } });
    },
    async refreshMeta() {
      const total = await collection.countDocuments({
        $or: [{ "body.period": { $exists: true } }, { year: { $exists: true } }],
      });
      const meta = { ...await this.getMeta(), total };
      await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $set: { total } });
      return meta;
    },
    async updateConnection() {
      const now = new Date();
      await collection.updateOne(
        { _id: COLLECTION_UPDATE_RECORD_ID },
        { $set: { value: now } },
        { upsert: true },
      );
      await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $unset: { Update: "" } });
      return now;
    },
    async getConnectionUpdate() {
      const marker = await collection.findOne({ _id: COLLECTION_UPDATE_RECORD_ID });
      return marker?.value ? normalizeDate(marker.value) : null;
    },
    async clearData() {
      const meta = await this.getMeta();
      await collection.deleteMany({ _id: { $nin: [COLLECTION_METADATA_RECORD_ID, COLLECTION_UPDATE_RECORD_ID] } });
      await collection.updateOne({ _id: COLLECTION_METADATA_RECORD_ID }, { $set: { ...meta, total: 0 } });
    },
    async delete() {
      const exists = await database
        .listCollections({ name: source.collectionName }, { nameOnly: true })
        .hasNext();
      if (exists) await database.dropCollection(source.collectionName);
    },
  };
}
