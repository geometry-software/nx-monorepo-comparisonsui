import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type {
  SessionToken,
  SessionTokenInput,
  SessionService as LibrarySessionService,
  SessionTokenUpdate,
} from "@cui/account/sessions";
import { LIBRARY_SESSION_SERVICE } from './session.tokens.js';

@Injectable()
export class SessionTokenService {
  constructor(
    @Inject(LIBRARY_SESSION_SERVICE)
    private readonly sessions: LibrarySessionService,
  ) {}

  async findAll(): Promise<SessionToken[]> {
    return this.sessions.listTokens();
  }

  async create(value: SessionTokenInput): Promise<SessionToken> {
    return this.sessions.createToken(parseTokenInput(value));
  }

  async update(id: number, value: SessionTokenUpdate): Promise<SessionToken> {
    return this.sessions.updateToken(id, parseTokenUpdate(value));
  }
}

function parseTokenInput(value: SessionTokenInput): SessionTokenInput {
  const token = typeof value?.token === "string" ? value.token.trim() : "";
  const provider = typeof value?.provider === "string" ? value.provider.trim() : "";
  if (!token || !provider) {
    throw new BadRequestException("Token and provider are required");
  }
  return { token, provider };
}

function parseTokenUpdate(value: SessionTokenUpdate): SessionTokenUpdate {
  if (!value || typeof value !== "object") {
    throw new BadRequestException("Verified and closed timestamps are required");
  }
  return {
    verifiedAt: parseTimestamp(value.verifiedAt, "Verified"),
    closedAt: parseTimestamp(value.closedAt, "Closed"),
  };
}

function parseTimestamp(value: unknown, label: string): string | null {
  if (value === null) return null;
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) {
    throw new BadRequestException(`${label} timestamp must be a valid date or null`);
  }
  return new Date(value).toISOString();
}
