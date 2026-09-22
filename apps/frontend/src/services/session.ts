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

export function getSession(): Session | undefined {
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
  currentSessionRequest ??= request<Session | null>(
    "sessions/current",
    undefined,
    null,
  )
    .then((session) => {
      activeSession = session ?? undefined;
      return activeSession;
    })
    .catch((error: unknown) => {
      currentSessionRequest = undefined;
      throw error;
    });
  return currentSessionRequest;
}

export function createSession(): Promise<Session> {
  if (pendingSession) return pendingSession;

  pendingSession = request<Session>("sessions", { method: "POST" })
    .then((session) => {
      activeSession = session;
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
  });
  if (activeSession) {
    activeSession = {
      ...activeSession,
      verified: result.verified,
      verifiedAt: result.verifiedAt,
    };
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
      body: JSON.stringify({ id: String(activeSession.sessionId) }),
    },
    { logout: true },
  );
  if (!result.logout) {
    throw new Error("Session logout was not completed");
  }
  activeSession = undefined;
  currentSessionRequest = Promise.resolve(undefined);
  return result;
}

export async function ensureSession(): Promise<number> {
  if (activeSession?.active) return activeSession.sessionId;
  return (await createSession()).sessionId;
}

async function request<TResponse>(
  path: string,
  init?: RequestInit,
  emptyResponse?: TResponse,
): Promise<TResponse> {
  return trackRequestActivity(requestMethod(init), async () => {
    let response: Response;
    try {
      response = await fetch(getServiceApiUrl("auth", path), {
        ...init,
        credentials: "include",
        headers: { accept: "application/json", ...init?.headers },
      });
    } catch {
      throw new Error("Auth service is unavailable");
    }
    if (!response.ok) {
      throw new Error(await responseError(response));
    }
    const responseBody = await response.text();
    if (!responseBody) {
      if (emptyResponse !== undefined) return emptyResponse;
      throw new Error("Auth service returned an empty response");
    }
    return JSON.parse(responseBody) as TResponse;
  });
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
