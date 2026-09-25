import {
  RepositoryNotFoundError,
  RepositoryOperationError,
} from "@cui/network/providers/core";
import { deleteApp, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  getIdToken,
  initializeAuth,
  inMemoryPersistence,
  signInAnonymously,
  type Auth,
} from "firebase/auth";
import type {
  FirebaseAuthProviderRepository,
  FirebaseAuthProviderRepositoryOptions,
} from "../models/firebase.model.js";
import type {
  SessionIdentity,
  SessionIdentityVerification,
} from "../models/session.model.js";

const FIREBASE_PROVIDER = "firebase";
const REFRESH_CREDENTIAL_PREFIX = "refresh:";
const INVALID_CREDENTIAL_CODES = new Set([
  "INVALID_REFRESH_TOKEN",
  "INVALID_ID_TOKEN",
  "TOKEN_EXPIRED",
  "USER_DISABLED",
  "USER_NOT_FOUND",
  "PROJECT_NUMBER_MISMATCH",
]);

type FirebaseTokenResponse = {
  id_token: string;
  user_id: string;
};

type FirebaseLookupResponse = {
  users?: { localId: string }[];
};

export function createFirebaseAuthProviderRepository(
  options: FirebaseAuthProviderRepositoryOptions,
): FirebaseAuthProviderRepository {
  let appSequence = 0;

  return {
    async create(): Promise<SessionIdentity> {
      const app = initializeApp(
        { apiKey: options.apiKey, projectId: options.projectId },
        `cui-account-session-${Date.now()}-${appSequence++}`,
      );
      try {
        const auth = createMemoryAuth(app);
        const { user } = await signInAnonymously(auth);
        await getIdToken(user);
        if (!user.refreshToken) {
          throw new Error("Firebase Auth did not provide a refresh token");
        }
        return {
          provider: FIREBASE_PROVIDER,
          identityId: user.uid,
          credential: `${REFRESH_CREDENTIAL_PREFIX}${user.refreshToken}`,
        };
      } catch (error) {
        throw new RepositoryOperationError("create Firebase Auth session", error);
      } finally {
        await deleteApp(app);
      }
    },

    async verify(credential: string): Promise<SessionIdentityVerification> {
      const identity = await resolveIdentity(options.apiKey, credential);
      return { identityId: identity.identityId, verified: true };
    },

    async close(credential: string): Promise<void> {
      const identity = await resolveIdentity(options.apiKey, credential);
      await firebaseRequest(
        `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${encodeURIComponent(options.apiKey)}`,
        { idToken: identity.idToken },
        "close Firebase Auth session",
      );
    },
  };
}

async function resolveIdentity(
  apiKey: string,
  credential: string,
): Promise<{ identityId: string; idToken: string }> {
  // Older browser sessions contain an ID token; new sessions contain a prefixed refresh token.
  if (!credential.startsWith(REFRESH_CREDENTIAL_PREFIX)) {
    const result = await firebaseRequest<FirebaseLookupResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
      { idToken: credential },
      "verify Firebase Auth session",
    );
    const identityId = result.users?.[0]?.localId;
    if (!identityId) throw new RepositoryNotFoundError("Firebase Auth session");
    return { identityId, idToken: credential };
  }

  const result = await firebaseRequest<FirebaseTokenResponse>(
    `https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(apiKey)}`,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: credential.slice(REFRESH_CREDENTIAL_PREFIX.length),
    }),
    "verify Firebase Auth session",
  );
  if (!result.user_id || !result.id_token) {
    throw new RepositoryOperationError(
      "verify Firebase Auth session",
      new Error("Firebase Auth returned an incomplete token response"),
    );
  }
  return { identityId: result.user_id, idToken: result.id_token };
}

async function firebaseRequest<TResponse = unknown>(
  url: string,
  body: Record<string, string> | URLSearchParams,
  operation: string,
): Promise<TResponse> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": body instanceof URLSearchParams
          ? "application/x-www-form-urlencoded"
          : "application/json",
      },
      body: body instanceof URLSearchParams ? body : JSON.stringify(body),
    });
  } catch (error) {
    throw new RepositoryOperationError(operation, error);
  }

  let responseBody: string;
  try {
    responseBody = await response.text();
  } catch (error) {
    throw new RepositoryOperationError(operation, error);
  }
  if (!response.ok) {
    let errorBody: { error?: { message?: string } } | undefined;
    try {
      errorBody = JSON.parse(responseBody) as typeof errorBody;
    } catch {
      // Firebase may return a non-JSON error response.
    }
    const code = errorBody?.error?.message;
    if (code && INVALID_CREDENTIAL_CODES.has(code)) {
      throw new RepositoryNotFoundError("Firebase Auth session");
    }
    throw new RepositoryOperationError(
      operation,
      new Error(code ?? `Firebase Auth returned HTTP ${response.status}`),
    );
  }
  try {
    return (responseBody ? JSON.parse(responseBody) : {}) as TResponse;
  } catch (error) {
    throw new RepositoryOperationError(operation, error);
  }
}

function createMemoryAuth(app: FirebaseApp): Auth {
  try {
    return initializeAuth(app, { persistence: inMemoryPersistence });
  } catch {
    return getAuth(app);
  }
}
