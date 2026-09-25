import { trackRequestActivity, type RequestMethod } from "./request-activity";

export class DataSourceRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "DataSourceRequestError";
  }
}

async function throwForError(response: Response): Promise<void> {
  if (response.ok) return;
  const payload = (await response.json().catch(() => undefined)) as
    | { message?: string | string[]; error?: string }
    | undefined;
  const message = payload?.message;
  throw new DataSourceRequestError(
    Array.isArray(message)
      ? message.join(" ")
      : typeof message === "string"
        ? message
        : typeof payload?.error === "string"
          ? payload.error
          : `Data source request failed (HTTP ${response.status}).`,
    response.status,
  );
}

export function dataSourceRequestBlob(url: string, init?: RequestInit): Promise<Blob> {
  const requestedMethod = init?.method?.toUpperCase();
  const method: RequestMethod =
    requestedMethod === "POST" || requestedMethod === "PUT" ||
    requestedMethod === "PATCH" || requestedMethod === "DELETE"
      ? requestedMethod
      : "GET";
  return trackRequestActivity(method, async () => {
    const response = await fetch(url, init);
    await throwForError(response);
    return response.blob();
  });
}

export async function dataSourceRequest<TData>(
  url: string,
  init?: RequestInit,
): Promise<TData> {
  const requestedMethod = init?.method?.toUpperCase();
  const method: RequestMethod =
    requestedMethod === "POST" || requestedMethod === "PUT" ||
    requestedMethod === "PATCH" || requestedMethod === "DELETE"
      ? requestedMethod
      : "GET";
  return trackRequestActivity(method, async () => {
    const response = await fetch(url, init);
    const payload = (await response.json().catch(() => undefined)) as
      | TData
      | { message?: string | string[]; error?: string }
      | undefined;
    if (!response.ok) {
      const message =
        typeof payload === "object" && payload !== null && "message" in payload
          ? payload.message
          : undefined;
      throw new DataSourceRequestError(
        Array.isArray(message)
          ? message.join(" ")
          : typeof message === "string"
            ? message
            : typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string"
              ? payload.error
              : `Data source request failed (HTTP ${response.status}).`,
        response.status,
      );
    }
    return payload as TData;
  });
}
