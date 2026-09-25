import { getServiceApiUrl } from "./service-location";
import {
  trackRequestActivity,
  type RequestMethod,
} from "./request-activity";

export type RepositoryConnection = {
  connected: boolean;
  identifier?: string;
  error?: string;
};

export type SessionRepositoryConnections = {
  firebase: RepositoryConnection;
  supabase: RepositoryConnection;
};

export type Session = {
  sessionId: number;
  provider: string;
  identityId: string;
  createdAt: string;
  verifiedAt?: string;
  active: true;
  verified: boolean;
  credential: string;
};

export type SessionVerification = {
  identityId: string;
  verified: boolean;
  verifiedAt?: string;
};

export type LogoutSessionResponse = {
  logout: boolean;
};

let activeSession: Session | undefined;
let pendingSession: Promise<Session> | undefined;
let repositoryConnectionsRequest:
  | Promise<SessionRepositoryConnections>
  | undefined;
let currentSessionRequest: Promise<Session | undefined> | undefined;
const SESSION_STORAGE_KEY = "account.session";

class AuthRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export function getSession(): Session | undefined {
  activeSession ??= readStoredSession();
  return activeSession;
}

export function getSessionRepositoryConnections(): Promise<SessionRepositoryConnections> {
  repositoryConnectionsRequest ??= request<{
    identity: RepositoryConnection;
    storage: RepositoryConnection;
  }>("sessions/providers")
    .then((connections) => ({
      firebase: connections.identity,
      supabase: connections.storage,
    }))
    .catch((error: unknown) => {
      repositoryConnectionsRequest = undefined;
      throw error;
    });
  return repositoryConnectionsRequest;
}

export function getCurrentSession(): Promise<Session | undefined> {
  if (!getSession()) return Promise.resolve(undefined);
  currentSessionRequest ??= fetchCurrentSession();
  return currentSessionRequest;
}

export function refreshCurrentSession(): Promise<Session> {
  if (!getSession()) {
    return Promise.reject(new Error("Active session is missing"));
  }
  const refreshRequest = fetchCurrentSession();
  currentSessionRequest = refreshRequest;
  return refreshRequest;
}

function fetchCurrentSession(): Promise<Session> {
  const credential = getSession()?.credential;
  if (!credential) {
    return Promise.reject(new Error("Active session is missing"));
  }
  return request<Session>("sessions/current", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ credential }),
  })
    .then((session) => {
      if (
        activeSession &&
        (session.sessionId !== activeSession.sessionId ||
          session.identityId !== activeSession.identityId ||
          session.provider !== activeSession.provider)
      ) {
        activeSession = undefined;
        removeStoredSession();
        throw new Error("Account session no longer matches its Firebase identity or session ID");
      }
      activeSession = session;
      storeSession(session);
      return session;
    })
    .catch((error: unknown) => {
      currentSessionRequest = undefined;
      if (error instanceof AuthRequestError && error.status === 401) {
        activeSession = undefined;
        removeStoredSession();
      }
      throw error;
    });
}

export function createSession(): Promise<Session> {
  if (pendingSession) return pendingSession;

  pendingSession = request<Session>("sessions", { method: "POST" })
    .then((session) => {
      activeSession = session;
      storeSession(session);
      currentSessionRequest = Promise.resolve(session);
      return session;
    })
    .finally(() => {
      pendingSession = undefined;
    });
  return pendingSession;
}

export async function verifySession(): Promise<SessionVerification> {
  const result = await request<SessionVerification>("sessions/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ credential: activeSession?.credential }),
  });
  if (activeSession) {
    activeSession = {
      ...activeSession,
      verified: result.verified,
      verifiedAt: result.verifiedAt,
    };
    storeSession(activeSession);
  }
  return result;
}

export async function closeSession(): Promise<LogoutSessionResponse> {
  if (!activeSession) {
    throw new Error("Active session is missing");
  }
  const result = await request<LogoutSessionResponse>(
    "sessions/logout",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: String(activeSession.sessionId),
        credential: activeSession.credential,
      }),
    },
    { logout: true },
  );
  if (!result.logout) {
    throw new Error("Session logout was not completed");
  }
  activeSession = undefined;
  removeStoredSession();
  currentSessionRequest = Promise.resolve(undefined);
  return result;
}

export async function ensureSession(): Promise<number> {
  const session = getSession();
  if (session?.active) return session.sessionId;
  return (await createSession()).sessionId;
}

async function request<TResponse>(
  path: string,
  init?: RequestInit,
  emptyResponse?: TResponse,
): Promise<TResponse> {
  return trackRequestActivity(requestMethod(init), async () => {
    let response: Response;
    const url = getServiceApiUrl("auth", path);
    try {
      response = await fetch(url, {
        ...init,
        headers: { accept: "application/json", ...init?.headers },
      });
    } catch (error) {
      throw new Error(
        `Unable to reach Auth service at ${url}: ${error instanceof Error ? error.message : "Network request failed"}`,
      );
    }
    if (!response.ok) {
      throw new AuthRequestError(await responseError(response), response.status);
    }
    const responseBody = await response.text();
    if (!responseBody) {
      if (emptyResponse !== undefined) return emptyResponse;
      throw new Error("Auth service returned an empty response");
    }
    return JSON.parse(responseBody) as TResponse;
  });
}

function readStoredSession(): Session | undefined {
  try {
    const value = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!value) return undefined;
    const session = JSON.parse(value) as Partial<Session>;
    if (
      !Number.isSafeInteger(session.sessionId) ||
      typeof session.credential !== "string" || !session.credential ||
      typeof session.identityId !== "string" || !session.identityId ||
      typeof session.provider !== "string" ||
      typeof session.createdAt !== "string" ||
      session.active !== true ||
      typeof session.verified !== "boolean"
    ) {
      removeStoredSession();
      return undefined;
    }
    return session as Session;
  } catch {
    return undefined;
  }
}

function storeSession(session: Session): void {
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Keep the current in-memory session when browser storage is unavailable.
  }
}

function removeStoredSession(): void {
  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // Browser storage may be unavailable.
  }
}

function requestMethod(init?: RequestInit): RequestMethod {
  const method = init?.method?.toUpperCase();
  if (method === "POST" || method === "PUT" || method === "DELETE") {
    return method;
  }
  return "GET";
}

async function responseError(response: Response): Promise<string> {
  const value = (await response.json().catch(() => undefined)) as
    | { message?: unknown }
    | undefined;
  return typeof value?.message === "string"
    ? value.message
    : `Auth request failed with status ${response.status}`;
}
