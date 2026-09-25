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
