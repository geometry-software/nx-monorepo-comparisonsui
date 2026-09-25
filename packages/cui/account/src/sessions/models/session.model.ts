import type { SessionToken, SessionTokenInput, SessionTokenUpdate } from './session-token.model.js';

export type SessionIdentity = {
  provider: string;
  identityId: string;
  credential: string;
};

export type NewStoredSession = {
  provider: string;
  providerId: string;
};

export type StoredSession = {
  sessionId: number;
  createdAt: string;
  provider: string;
  verifiedAt?: string;
};

export type VerifiedStoredSession = StoredSession & {
  verifiedAt: string;
};

export type ClosedStoredSession = StoredSession & {
  closedAt: string;
};

export type Session = StoredSession &
  SessionIdentity & {
    active: true;
    verified: boolean;
  };

export type SessionIdentityVerification = {
  identityId: string;
  verified: boolean;
};

export type SessionVerification = SessionIdentityVerification & {
  verifiedAt?: string;
};

export type SessionProviderConnection =
  | {
      connected: true;
      identifier: string;
    }
  | {
      connected: false;
      error: string;
    };

export interface SessionIdentityPort {
  create(): Promise<SessionIdentity>;
  verify(credential: string): Promise<SessionIdentityVerification>;
  close(credential: string): Promise<void>;
}

export interface SessionStoragePort {
  create(value: NewStoredSession): Promise<StoredSession>;
  findActive(providerId: string): Promise<StoredSession>;
  markVerified(sessionId: number): Promise<VerifiedStoredSession>;
  close(sessionId: number): Promise<ClosedStoredSession>;
  listTokens(): Promise<SessionToken[]>;
  createToken(value: SessionTokenInput): Promise<SessionToken>;
  updateToken(sessionId: number, value: SessionTokenUpdate): Promise<SessionToken>;
}

export type SessionProviderRegistration<TProvider> =
  | {
      useValue: TProvider;
      connection: Extract<SessionProviderConnection, { connected: true }>;
    }
  | {
      useValue?: never;
      connection: Extract<SessionProviderConnection, { connected: false }>;
    };

export type SessionServiceConfiguration = {
  identity: SessionProviderRegistration<SessionIdentityPort>;
  storage: SessionProviderRegistration<SessionStoragePort>;
};

export type SessionProviderConnections = {
  identity: SessionProviderConnection;
  storage: SessionProviderConnection;
};

export type SessionProviderOptions<TIdentity, TStorage> = {
  identity: TIdentity;
  storage: TStorage;
};

export interface SessionService {
  initialize(): SessionProviderConnections;
  create(): Promise<Session>;
  current(credential: string): Promise<Session>;
  verify(credential: string): Promise<SessionVerification>;
  close(sessionId: number, credential: string): Promise<ClosedStoredSession>;
  listTokens(): Promise<SessionToken[]>;
  createToken(value: SessionTokenInput): Promise<SessionToken>;
  updateToken(sessionId: number, value: SessionTokenUpdate): Promise<SessionToken>;
}
