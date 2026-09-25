import { getServiceApiUrl } from "./service-location";
import { trackRequestActivity } from "./request-activity";

export type SessionToken = {
  sessionId: number;
  token: string;
  provider: string;
  createdAt: string;
  verifiedAt?: string;
  closedAt?: string;
};

export type SessionTokenInput = Pick<SessionToken, "token" | "provider">;
export type SessionTokenUpdate = {
  verifiedAt: string | null;
  closedAt: string | null;
};

export function listTokens(): Promise<SessionToken[]> {
  return request<SessionToken[]>("", "GET");
}

export function createToken(value: SessionTokenInput): Promise<SessionToken> {
  return request<SessionToken>("", "POST", value);
}

export function updateToken(id: number, value: SessionTokenUpdate): Promise<SessionToken> {
  return request<SessionToken>(String(id), "PATCH", value);
}

async function request<T>(
  path: string,
  method: "GET" | "POST" | "PATCH",
  body?: SessionTokenInput | SessionTokenUpdate,
): Promise<T> {
  return trackRequestActivity(method, async () => {
    let response: Response;
    const url = getServiceApiUrl("auth", `tokens/${path}`);
    try {
      response = await fetch(url, {
        method,
        headers: {
          accept: "application/json",
          ...(body ? { "content-type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (error) {
      throw new Error(
        `Unable to reach Auth service at ${url}: ${error instanceof Error ? error.message : "Network request failed"}`,
      );
    }
    if (!response.ok) {
      const detail = (await response.json().catch(() => undefined)) as
        | { message?: string | string[] }
        | undefined;
      const message = detail?.message;
      throw new Error(
        Array.isArray(message)
          ? message.join(", ")
          : message ?? `Token request failed with status ${response.status}`,
      );
    }
    return response.json() as Promise<T>;
  });
}
