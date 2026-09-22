import type { SessionIdentityPort } from "./session.model.js";

export type FirebaseAuthProviderRepository = SessionIdentityPort;

export type FirebaseAuthProviderRepositoryOptions = {
  apiKey: string;
};

export type FirebaseSessionIdentityProviderOptions = {
  apiKey?: string;
  projectId?: string;
};
