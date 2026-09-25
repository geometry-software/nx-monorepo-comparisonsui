import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  RepositoryNotFoundError,
  RepositoryOperationError,
  RepositoryValidationError,
} from "@cui/network/providers/core";
import type {
  SupabaseSessionStorageProviderRepository,
  SupabaseSessionStorageProviderRepositoryOptions,
} from "../models/supabase.model.js";
import type {
  ClosedStoredSession,
  NewStoredSession,
  StoredSession,
  VerifiedStoredSession,
} from "../models/session.model.js";
import type { SessionToken, SessionTokenInput, SessionTokenUpdate } from '../models/session-token.model.js';

const SESSION_COLUMNS = "id, created_at, verified_at, provider";
const CLOSED_SESSION_COLUMNS =
  "id, created_at, verified_at, closed_at, provider";
const TOKEN_COLUMNS = 'id, provider_id, provider, created_at, verified_at, closed_at';

export function createSupabaseSessionStorageProviderRepository(
  options: SupabaseSessionStorageProviderRepositoryOptions,
): SupabaseSessionStorageProviderRepository {
  return new SupabaseSessionStorageProviderRepositoryAdapter(
    createClient(options.url, options.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  );
}

class SupabaseSessionStorageProviderRepositoryAdapter
  implements SupabaseSessionStorageProviderRepository
{
  constructor(private readonly client: SupabaseClient) {}

  async create(value: NewStoredSession): Promise<StoredSession> {
    const { data, error } = await this.client
      .from("sessions")
      .insert({
        provider: value.provider,
        provider_id: value.providerId,
      })
      .select(SESSION_COLUMNS)
      .single();
    if (error) {
      throwSupabaseError(error, "create Supabase session row", "verified_at");
    }
    return decodeStoredSession(data);
  }

  async findActive(providerId: string): Promise<StoredSession> {
    const { data, error } = await this.client
      .from("sessions")
      .select(SESSION_COLUMNS)
      .eq("provider_id", providerId)
      .is("closed_at", null)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) {
      throwSupabaseError(
        error,
        "find active Supabase session row",
        "verified_at",
      );
    }
    if (!data) {
      throw new RepositoryNotFoundError("Active Supabase session");
    }
    return decodeStoredSession(data);
  }

  async markVerified(sessionId: number): Promise<VerifiedStoredSession> {
    const verifiedAt = new Date().toISOString();
    const { data, error } = await this.client
      .from("sessions")
      .update({ verified_at: verifiedAt })
      .eq("id", sessionId)
      .is("closed_at", null)
      .select(SESSION_COLUMNS)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        throw new RepositoryNotFoundError("Supabase session", sessionId);
      }
      throwSupabaseError(error, "verify Supabase session row", "verified_at");
    }
    return decodeVerifiedStoredSession(data);
  }

  async close(sessionId: number): Promise<ClosedStoredSession> {
    const closedAt = new Date().toISOString();
    const { data, error } = await this.client
      .from("sessions")
      .update({ closed_at: closedAt })
      .eq("id", sessionId)
      .is("closed_at", null)
      .select(CLOSED_SESSION_COLUMNS)
      .single();
    if (error) {
      if (error.code === "PGRST116") {
        throw new RepositoryNotFoundError("Supabase session", sessionId);
      }
      throwSupabaseError(error, "close Supabase session row", "closed_at");
    }
    return decodeClosedStoredSession(data);
  }

  async listTokens(): Promise<SessionToken[]> {
    const { data, error } = await this.client
      .from('sessions')
      .select(TOKEN_COLUMNS)
      .order('created_at', { ascending: false });
    if (error) throw new RepositoryOperationError('list session tokens', error);
    return (data ?? []).map(decodeSessionToken);
  }

  async createToken(value: SessionTokenInput): Promise<SessionToken> {
    const { data, error } = await this.client
      .from('sessions')
      .insert({ provider_id: value.token, provider: value.provider })
      .select(TOKEN_COLUMNS)
      .single();
    if (error) throw new RepositoryOperationError('create session token', error);
    return decodeSessionToken(data);
  }

  async updateToken(sessionId: number, value: SessionTokenUpdate): Promise<SessionToken> {
    const { data, error } = await this.client
      .from('sessions')
      .update({ verified_at: value.verifiedAt, closed_at: value.closedAt })
      .eq('id', sessionId)
      .select(TOKEN_COLUMNS)
      .maybeSingle();
    if (error) throw new RepositoryOperationError('update session token', error);
    if (!data) throw new RepositoryNotFoundError('Session token', sessionId);
    return decodeSessionToken(data);
  }
}

function throwSupabaseError(
  error: { code: string },
  operation: string,
  missingColumn: "verified_at" | "closed_at",
): never {
  if (error.code === "PGRST205" || error.code === "42P01") {
    throw new RepositoryValidationError(
      "The sessions table does not exist. Create it first.",
    );
  }
  if (error.code === "PGRST204" || error.code === "42703") {
    throw new RepositoryValidationError(
      `The ${missingColumn} column does not exist. Create it first.`,
    );
  }
  throw new RepositoryOperationError(operation, error);
}

function decodeStoredSession(value: unknown): StoredSession {
  if (typeof value !== "object" || value === null) {
    throw new RepositoryValidationError(
      "Supabase returned an invalid session row",
    );
  }
  const record = value as Record<string, unknown>;
  const sessionId = Number(record.id);
  const createdAt = String(record.created_at ?? "");
  const provider = String(record.provider ?? "");
  const verifiedAt = record.verified_at
    ? String(record.verified_at)
    : undefined;
  if (!Number.isSafeInteger(sessionId) || !createdAt || !provider) {
    throw new RepositoryValidationError(
      "Supabase returned an incomplete session row",
    );
  }
  return { sessionId, createdAt, provider, verifiedAt };
}

function decodeVerifiedStoredSession(value: unknown): VerifiedStoredSession {
  const session = decodeStoredSession(value);
  if (!session.verifiedAt) {
    throw new RepositoryValidationError(
      "Supabase returned an incomplete verified session row",
    );
  }
  return { ...session, verifiedAt: session.verifiedAt };
}

function decodeClosedStoredSession(value: unknown): ClosedStoredSession {
  const session = decodeStoredSession(value);
  const closedAt = String(
    (value as Record<string, unknown>).closed_at ?? "",
  );
  if (!closedAt) {
    throw new RepositoryValidationError(
      "Supabase returned an incomplete closed session row",
    );
  }
  return { ...session, closedAt };
}

function decodeSessionToken(value: unknown): SessionToken {
  if (typeof value !== 'object' || value === null) {
    throw new RepositoryValidationError('Supabase returned an invalid session token row');
  }
  const row = value as Record<string, unknown>;
  const sessionId = Number(row.id);
  const token = String(row.provider_id ?? '');
  const provider = String(row.provider ?? '');
  const createdAt = String(row.created_at ?? '');
  if (!Number.isSafeInteger(sessionId) || !token || !provider || !createdAt) {
    throw new RepositoryValidationError('Supabase returned an incomplete session token row');
  }
  return {
    sessionId,
    token,
    provider,
    createdAt,
    verifiedAt: row.verified_at ? String(row.verified_at) : undefined,
    closedAt: row.closed_at ? String(row.closed_at) : undefined,
  };
}
