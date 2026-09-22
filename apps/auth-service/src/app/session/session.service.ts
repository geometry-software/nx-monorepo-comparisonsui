import {
  Inject,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import type {
  ClosedStoredSession,
  Session as LibrarySession,
  SessionProviderConnections,
  SessionService as LibrarySessionService,
  SessionVerification,
} from "@cui/account/sessions";
import { LIBRARY_SESSION_SERVICE } from "./session.tokens.js";

export type AuthSession = Omit<LibrarySession, "credential">;

@Injectable()
export class SessionService {
  constructor(
    @Inject(LIBRARY_SESSION_SERVICE)
    private readonly sessions: LibrarySessionService,
  ) {}

  providers(): SessionProviderConnections {
    return this.sessions.initialize();
  }

  async create(): Promise<{
    session: AuthSession;
    credential: string;
  }> {
    try {
      const { credential, ...session } = await this.sessions.create();
      return { session, credential };
    } catch (error) {
      throw new ServiceUnavailableException(errorMessage(error));
    }
  }

  async verify(credential: string): Promise<SessionVerification> {
    try {
      return await this.sessions.verify(credential);
    } catch (error) {
      throw new UnauthorizedException(errorMessage(error));
    }
  }

  async current(credential: string): Promise<AuthSession> {
    try {
      const session = await this.sessions.current(credential);
      return {
        sessionId: session.sessionId,
        createdAt: session.createdAt,
        provider: session.provider,
        identityId: session.identityId,
        active: session.active,
        verified: session.verified,
        verifiedAt: session.verifiedAt,
      };
    } catch (error) {
      throw new UnauthorizedException(errorMessage(error));
    }
  }

  async close(
    sessionId: number,
    credential: string,
  ): Promise<ClosedStoredSession> {
    try {
      return await this.sessions.close(sessionId, credential);
    } catch (error) {
      throw new ServiceUnavailableException(errorMessage(error));
    }
  }
}

function errorMessage(error: unknown): string {
  if (!(error instanceof Error)) return "Session provider request failed";
  const cause = error.cause;
  if (cause instanceof Error) return `${error.message}: ${cause.message}`;
  if (typeof cause === "object" && cause !== null) {
    const message = (cause as { message?: unknown }).message;
    if (typeof message === "string") return `${error.message}: ${message}`;
  }
  return error.message;
}
