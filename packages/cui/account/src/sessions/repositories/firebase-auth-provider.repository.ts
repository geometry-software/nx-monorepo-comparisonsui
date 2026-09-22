import {
  RepositoryNotFoundError,
  RepositoryOperationError,
  RepositoryValidationError,
} from "@cui/network/providers/core";
import type {
  FirebaseAuthProviderRepository,
  FirebaseAuthProviderRepositoryOptions,
} from "../models/firebase.model.js";
import type {
  SessionIdentity,
  SessionIdentityVerification,
} from "../models/session.model.js";

const FIREBASE_PROVIDER = "firebase";

type FirebaseSignUpResponse = {
  localId?: unknown;
  refreshToken?: unknown;
};

type FirebaseRefreshResponse = {
  id_token?: unknown;
};

type FirebaseLookupResponse = {
  users?: Array<{ localId?: unknown }>;
};

export function createFirebaseAuthProviderRepository(
  options: FirebaseAuthProviderRepositoryOptions,
): FirebaseAuthProviderRepository {
  return {
    async create(): Promise<SessionIdentity> {
      try {
        const data = await requestFirebase<FirebaseSignUpResponse>(
          "accounts:signUp",
          options.apiKey,
          { returnSecureToken: true },
        );
        if (
          typeof data.localId !== "string" ||
          typeof data.refreshToken !== "string"
        ) {
          throw new RepositoryValidationError(
            "Firebase returned an incomplete session identity",
          );
        }
        return {
          provider: FIREBASE_PROVIDER,
          identityId: data.localId,
          credential: data.refreshToken,
        };
      } catch (error) {
        if (error instanceof RepositoryValidationError) throw error;
        throw new RepositoryOperationError(
          "create Firebase Auth session",
          error,
        );
      }
    },

    async verify(
      credential: string,
    ): Promise<SessionIdentityVerification> {
      try {
        const refreshed = await refreshFirebaseToken(
          options.apiKey,
          credential,
        );
        if (typeof refreshed.id_token !== "string") {
          throw new RepositoryNotFoundError("Firebase Auth session");
        }
        const data = await requestFirebase<FirebaseLookupResponse>(
          "accounts:lookup",
          options.apiKey,
          { idToken: refreshed.id_token },
        );
        const identityId = data.users?.[0]?.localId;
        if (typeof identityId !== "string") {
          throw new RepositoryNotFoundError("Firebase Auth session");
        }
        return { identityId, verified: true };
      } catch (error) {
        if (error instanceof RepositoryNotFoundError) throw error;
        throw new RepositoryOperationError(
          "verify Firebase Auth session",
          error,
        );
      }
    },

    async close(credential: string): Promise<void> {
      try {
        const refreshed = await refreshFirebaseToken(
          options.apiKey,
          credential,
        );
        if (typeof refreshed.id_token !== "string") {
          throw new RepositoryNotFoundError("Firebase Auth session");
        }
        await requestFirebase<Record<string, never>>(
          "accounts:delete",
          options.apiKey,
          { idToken: refreshed.id_token },
        );
      } catch (error) {
        if (error instanceof RepositoryNotFoundError) throw error;
        throw new RepositoryOperationError(
          "close Firebase Auth session",
          error,
        );
      }
    },
  };
}

async function refreshFirebaseToken(
  apiKey: string,
  refreshToken: string,
): Promise<FirebaseRefreshResponse> {
  const response = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    },
  );
  const data = await readResponseBody(response);
  if (!response.ok) {
    throw new Error(firebaseErrorMessage(data, response.status));
  }
  return data as FirebaseRefreshResponse;
}

async function requestFirebase<TResponse>(
  operation: string,
  apiKey: string,
  body: Record<string, unknown>,
): Promise<TResponse> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/${operation}?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const data = await readResponseBody(response);
  if (!response.ok) {
    throw new Error(firebaseErrorMessage(data, response.status));
  }
  return data as TResponse;
}

async function readResponseBody(response: Response): Promise<unknown> {
  return response.json().catch(() => undefined);
}

function firebaseErrorMessage(value: unknown, status: number): string {
  if (typeof value !== "object" || value === null) {
    return `Firebase request failed with status ${status}`;
  }
  const error = (value as { error?: { message?: unknown } }).error;
  return typeof error?.message === "string"
    ? error.message
    : `Firebase request failed with status ${status}`;
}
