import type { SessionStoragePort } from "./session.model.js";

export type SupabaseSessionStorageProviderRepository = SessionStoragePort;

export type SupabaseSessionStorageProviderRepositoryOptions = {
  url: string;
  publishableKey: string;
};

export type SupabaseSessionStorageProviderOptions = {
  url?: string;
  publishableKey?: string;
};
