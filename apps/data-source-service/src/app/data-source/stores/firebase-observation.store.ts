import type { FirebaseConnectionProvider } from '@cui/network/providers/firebase';
import {
  COLLECTION_METADATA_RECORD_ID,
  COLLECTION_UPDATE_RECORD_ID,
  isCollectionDataRecordId,
} from '@cui/network/providers/core';
import {
  collection,
  deleteField,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from '@cui/network/providers/firebase';
import type { Observation } from "../data-source.models.js";
import type { SourceEntity } from "../entities/index.js";
import { createSourceMeta, normalizeDate } from "../data-source.models.js";
import type {
  CreateObservationStoreOptions,
  ObservationStoreResult,
} from './types.js';

const LEGACY_SOURCE_METADATA_DOCUMENT_ID = "source_metadata";

type StoredObservation = {
  id: string;
  period: string;
  value: number;
  createdAt: unknown;
  updatedAt: unknown;
};

export async function createFirebaseObservationStore(
  firebase: FirebaseConnectionProvider,
  source: SourceEntity,
  options: CreateObservationStoreOptions,
): Promise<ObservationStoreResult> {
    const firestore = await firebase.getFirestore();
    const marker = doc(
      firestore,
      source.collectionName,
      COLLECTION_METADATA_RECORD_ID,
    );
    const updateMarker = doc(firestore, source.collectionName, COLLECTION_UPDATE_RECORD_ID);
    const existingDocuments = options.createPhysicalSource
      ? await getDocs(
          query(collection(firestore, source.collectionName), limit(10)),
        )
      : undefined;
    const reused =
      existingDocuments?.docs.some(
        ({ id }) =>
          isCollectionDataRecordId(id) &&
          id !== LEGACY_SOURCE_METADATA_DOCUMENT_ID,
      ) ?? false;
    if (options.createPhysicalSource) {
      const [existingCount, currentMetadata, legacyMetadata, currentUpdate] = await Promise.all([
        getCountFromServer(collection(firestore, source.collectionName)),
        getDoc(marker),
        getDoc(doc(firestore, source.collectionName, LEGACY_SOURCE_METADATA_DOCUMENT_ID)),
        getDoc(updateMarker),
      ]);
      const existingMetadataCount = Number(currentMetadata.exists()) + Number(legacyMetadata.exists()) + Number(currentUpdate.exists());
      await setDoc(marker, {
        ...createSourceMeta(source, Math.max(0, existingCount.data().count - existingMetadataCount)),
        kind: "data-source",
        sourceId: source._id,
        provider: source.provider,
      });
    }

    const observations = collection(firestore, source.collectionName);
    const clearData = async () => {
      const documents = await getDocs(observations);
      const dataDocuments = documents.docs.filter(
        ({ id }) => isCollectionDataRecordId(id),
      );
      for (let start = 0; start < dataDocuments.length; start += 500) {
        const batch = writeBatch(firestore);
        for (const document of dataDocuments.slice(start, start + 500)) {
          batch.delete(document.ref);
        }
        await batch.commit();
      }
    };
    return {
      reused,
      store: {
        async createMany(input) {
          await this.getMeta();
          const now = new Date();
          const references = input.map(() => doc(observations));
          for (let start = 0; start < input.length; start += 500) {
            const batch = writeBatch(firestore);
            input.slice(start, start + 500).forEach(({ period, value }, offset) => {
              batch.set(references[start + offset], {
                body: { period, value }, createdAt: now, updatedAt: now,
              });
            });
            await batch.commit();
          }
          await setDoc(marker, { total: increment(input.length) }, { merge: true });
          return input.map(({ period, value }, index) => ({
            id: references[index].id,
            body: { period, value },
            createdAt: now,
            updatedAt: now,
          }));
        },
        async replaceMany(input) {
          await this.getMeta();
          const existing = await this.list();
          const byPeriod = new Map(existing.map((observation) => [observation.body.period, observation]));
          const now = new Date();
          const references = input.map(({ period }) => {
            const current = byPeriod.get(period);
            return current ? doc(observations, current.id) : doc(observations);
          });
          for (let start = 0; start < input.length; start += 500) {
            const batch = writeBatch(firestore);
            input.slice(start, start + 500).forEach(({ period, value }, offset) => {
              const current = byPeriod.get(period);
              batch.set(references[start + offset], current
                ? { body: { period, value }, updatedAt: now }
                : { body: { period, value }, createdAt: now, updatedAt: now }, { merge: true });
            });
            await batch.commit();
          }
          const added = input.filter(({ period }) => !byPeriod.has(period)).length;
          if (added) await setDoc(marker, { total: increment(added) }, { merge: true });
          return input.map(({ period, value }, index) => ({
            id: references[index].id,
            body: { period, value },
            createdAt: byPeriod.get(period)?.createdAt ?? now,
            updatedAt: now,
          }));
        },
        async list() {
          const result = await getDocs(observations);
          return result.docs
            .filter(
              ({ id }) =>
                isCollectionDataRecordId(id) &&
                id !== LEGACY_SOURCE_METADATA_DOCUMENT_ID,
            )
            .map((document) => {
              const value = document.data();
              return normalizeStoredObservation({
                id: document.id,
                period: String(value.body?.period ?? value.year),
                value: Number(value.body?.value ?? value.value),
                createdAt: value.createdAt,
                updatedAt: value.updatedAt,
              });
            })
            .sort((left, right) => left.createdAt.getTime() - right.createdAt.getTime());
        },
        async getMeta() {
          const markerSnapshot = await getDoc(marker);
          const stored = markerSnapshot.data();
          if (stored?.Update) {
            const currentUpdate = await getDoc(updateMarker);
            if (!currentUpdate.exists()) {
              await setDoc(updateMarker, { value: normalizeDate(stored.Update) });
            }
            await updateDoc(marker, { Update: deleteField() });
          }
          if (stored && typeof stored.total === "number" && Number.isFinite(stored.total)) {
            return {
              description: String(stored.description ?? ""),
              label: String(stored.label ?? source.name),
              collection: String(stored.collection ?? source.collectionName),
              total: stored.total,
              createdAt: normalizeDate(stored.createdAt ?? source.createdAt),
            };
          }
          const [count, legacyMetadata, currentUpdate] = await Promise.all([
            getCountFromServer(observations),
            getDoc(doc(firestore, source.collectionName, LEGACY_SOURCE_METADATA_DOCUMENT_ID)),
            getDoc(updateMarker),
          ]);
          const meta = createSourceMeta(source, Math.max(0,
            count.data().count - Number(markerSnapshot.exists()) - Number(legacyMetadata.exists()) - Number(currentUpdate.exists()),
          ));
          await setDoc(marker, { ...meta, kind: "data-source", sourceId: source._id, provider: source.provider }, { merge: true });
          return meta;
        },
        async setDescription(description) {
          await this.getMeta();
          await setDoc(marker, { description }, { merge: true });
        },
        async refreshMeta() {
          const meta = await this.getMeta();
          const [count, legacyMetadata, currentUpdate] = await Promise.all([
            getCountFromServer(observations),
            getDoc(doc(firestore, source.collectionName, LEGACY_SOURCE_METADATA_DOCUMENT_ID)),
            getDoc(updateMarker),
          ]);
          const total = Math.max(0, count.data().count - 1 - Number(legacyMetadata.exists()) - Number(currentUpdate.exists()));
          await setDoc(marker, { total }, { merge: true });
          return { ...meta, total };
        },
        async updateConnection() {
          const now = new Date();
          await setDoc(updateMarker, { value: now });
          const metadata = await getDoc(marker);
          if (metadata.data()?.Update) {
            await updateDoc(marker, { Update: deleteField() });
          }
          return now;
        },
        async getConnectionUpdate() {
          const updateSnapshot = await getDoc(updateMarker);
          const value = updateSnapshot.data()?.value;
          return value ? normalizeDate(value) : null;
        },
        async clearData() {
          await clearData();
          await setDoc(marker, { total: 0 }, { merge: true });
        },
        async delete() {
          const documents = await getDocs(observations);
          for (let start = 0; start < documents.docs.length; start += 500) {
            const batch = writeBatch(firestore);
            for (const document of documents.docs.slice(start, start + 500)) {
              batch.delete(document.ref);
            }
            await batch.commit();
          }
        },
      },
    };
}

function normalizeStoredObservation(value: StoredObservation): Observation {
  return {
    id: value.id,
    body: { period: value.period, value: value.value },
    createdAt: normalizeDate(value.createdAt),
    updatedAt: normalizeDate(value.updatedAt),
  };
}
