import { createFirebaseAuthProviderRepository } from "../repositories/firebase-auth-provider.repository.js";
import { createSupabaseSessionStorageProviderRepository } from "../repositories/supabase-session-provider.repository.js";
import type { FirebaseSessionIdentityProviderOptions } from "../models/firebase.model.js";
import type {
  SessionIdentityPort,
  SessionProviderOptions,
  SessionProviderRegistration,
  SessionServiceConfiguration,
  SessionStoragePort,
} from "../models/session.model.js";
import type { SupabaseSessionStorageProviderOptions } from "../models/supabase.model.js";

export type { FirebaseSessionIdentityProviderOptions } from "../models/firebase.model.js";
export type { SupabaseSessionStorageProviderOptions } from "../models/supabase.model.js";

export function createFirebaseSupabaseProviderConfiguration(
  options: SessionProviderOptions<
    FirebaseSessionIdentityProviderOptions,
    SupabaseSessionStorageProviderOptions
  >,
): SessionServiceConfiguration {
  return {
    identity: createFirebaseIdentityRegistration(options.identity),
    storage: createSupabaseStorageRegistration(options.storage),
  };
}

function createFirebaseIdentityRegistration(
  options: FirebaseSessionIdentityProviderOptions,
): SessionProviderRegistration<SessionIdentityPort> {
  try {
    const apiKey = requiredValue(options.apiKey, "FIREBASE_API_KEY");
    const projectId = requiredValue(options.projectId, "FIREBASE_PROJECT_ID");
    const provider = createFirebaseAuthProviderRepository({ apiKey });
    return {
      useValue: provider,
      connection: { connected: true, identifier: projectId },
    };
  } catch (error) {
    return {
      connection: { connected: false, error: errorMessage(error) },
    };
  }
}

function createSupabaseStorageRegistration(
  options: SupabaseSessionStorageProviderOptions,
): SessionProviderRegistration<SessionStoragePort> {
  try {
    const url = requiredValue(options.url, "SUPABASE_URL");
    const publishableKey = requiredValue(
      options.publishableKey,
      "SUPABASE_PUBLISHABLE_KEY",
    );
    const identifier = supabaseProjectReference(url);
    const provider = createSupabaseSessionStorageProviderRepository({
      url,
      publishableKey,
    });
    return {
      useValue: provider,
      connection: { connected: true, identifier },
    };
  } catch (error) {
    return {
      connection: { connected: false, error: errorMessage(error) },
    };
  }
}

function requiredValue(value: string | undefined, name: string): string {
  const normalizedValue = value?.trim();
  if (!normalizedValue) {
    throw new Error(`${name} is required to initialize session providers`);
  }
  return normalizedValue;
}

function supabaseProjectReference(url: string): string {
  const projectReference = new URL(url).hostname.split(".")[0];
  if (!projectReference) {
    throw new Error("SUPABASE_URL must contain a project reference");
  }
  return projectReference;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Initialization failed";
}
