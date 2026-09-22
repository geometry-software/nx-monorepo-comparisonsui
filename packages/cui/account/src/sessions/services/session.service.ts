import type {
  SessionProviderRegistration,
  SessionService,
  SessionServiceConfiguration,
} from "../models/session.model.js";

export {
  createFirebaseSupabaseProviderConfiguration,
} from "../configurations/firebase-supabase-provider.configuration.js";
export type {
  FirebaseSessionIdentityProviderOptions,
  SupabaseSessionStorageProviderOptions,
} from "../configurations/firebase-supabase-provider.configuration.js";

export type {
  ClosedStoredSession,
  Session,
  SessionIdentity,
  SessionIdentityVerification,
  SessionIdentityPort,
  SessionProviderConnection,
  SessionProviderConnections,
  SessionProviderOptions,
  SessionProviderRegistration,
  SessionService,
  SessionServiceConfiguration,
  SessionStoragePort,
  SessionVerification,
  StoredSession,
  VerifiedStoredSession,
} from "../models/session.model.js";

export class SessionProviderUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SessionProviderUnavailableError";
  }
}

export function createSessionService(
  configuration: SessionServiceConfiguration,
): SessionService {
  return {
    initialize() {
      return {
        identity: configuration.identity.connection,
        storage: configuration.storage.connection,
      };
    },
    async create() {
      const { identityProvider, storageProvider } =
        requireSessionProviders(configuration);
      const identity = await identityProvider.create();
      const storedSession = await storageProvider.create({
        provider: identity.provider,
        providerId: identity.identityId,
      });

      return {
        ...storedSession,
        identityId: identity.identityId,
        credential: identity.credential,
        active: true,
        verified: false,
      };
    },
    async current(credential) {
      const { identityProvider, storageProvider } =
        requireSessionProviders(configuration);
      const verification = await identityProvider.verify(credential);
      const storedSession = await storageProvider.findActive(
        verification.identityId,
      );
      return {
        ...storedSession,
        identityId: verification.identityId,
        credential,
        active: true,
        verified: verification.verified && Boolean(storedSession.verifiedAt),
      };
    },
    async verify(credential) {
      const { identityProvider, storageProvider } =
        requireSessionProviders(configuration);
      const verification = await identityProvider.verify(credential);
      if (!verification.verified) return verification;

      const storedSession = await storageProvider.findActive(
        verification.identityId,
      );
      const verifiedSession = await storageProvider.markVerified(
        storedSession.sessionId,
      );
      return {
        ...verification,
        verifiedAt: verifiedSession.verifiedAt,
      };
    },
    async close(sessionId, credential) {
      const { identityProvider, storageProvider } =
        requireSessionProviders(configuration);
      await identityProvider.close(credential);
      return storageProvider.close(sessionId);
    },
  };
}

function requireSessionProviders(configuration: SessionServiceConfiguration) {
  return {
    identityProvider: requireProvider(configuration.identity),
    storageProvider: requireProvider(configuration.storage),
  };
}

function requireProvider<TProvider>(
  registration: SessionProviderRegistration<TProvider>,
): TProvider {
  if (registration.useValue !== undefined) return registration.useValue;
  const message = registration.connection.connected
    ? "Session provider is not initialized"
    : registration.connection.error;
  throw new SessionProviderUnavailableError(message);
}
