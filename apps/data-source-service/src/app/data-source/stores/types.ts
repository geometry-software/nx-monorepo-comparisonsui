import type { SourceEntity } from '../entities/index.js';
import type { ObservationStore } from '../data-source.models.js';

export type CreateObservationStoreOptions = {
  createPhysicalSource: boolean;
};

export type ObservationStoreResult = {
  store: ObservationStore;
  reused: boolean;
};

export type ObservationStoreFactory = (
  source: SourceEntity,
  options: CreateObservationStoreOptions,
) => Promise<ObservationStoreResult>;
