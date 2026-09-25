import { ServiceUnavailableException } from "@nestjs/common";
import type { DataSourceProvider } from "../data-source.dto.js";
import type { SourceEntity } from "../entities/index.js";
import type { ObservationStoreFactory, ObservationStoreResult } from '../stores/types.js';

export function createObservationStore(
  storeFactories: ReadonlyMap<DataSourceProvider, ObservationStoreFactory>,
  source: SourceEntity,
  createPhysicalSource: boolean,
): Promise<ObservationStoreResult> {
  const factory = storeFactories.get(source.provider);
  if (!factory) {
    throw new ServiceUnavailableException(
      `Observation store is unavailable for provider: ${source.provider}`,
    );
  }
  return factory(source, { createPhysicalSource });
}
