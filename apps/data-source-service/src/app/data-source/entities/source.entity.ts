import type { DataSourceProvider } from "../data-source.dto.js";

export type SourceEntity = {
  _id: string;
  name: string;
  description?: string;
  provider: DataSourceProvider;
  collectionName: string;
  serviceId: string;
  reused: boolean;
  createdAt: Date;
  updatedAt: Date;
  updated?: Date;
};
