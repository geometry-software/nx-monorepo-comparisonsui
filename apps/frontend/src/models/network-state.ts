import type { RepositoryConnection } from "../services/session";
import type { TranslationKey } from "../app/i18n";

export const NetworkStatuses = {
  Connecting: "Connecting",
  Connected: "Connected",
  Disconnected: "Disconnected",
} as const;

export type NetworkStatus =
  (typeof NetworkStatuses)[keyof typeof NetworkStatuses];

export interface NetworkState {
  status: NetworkStatus;
  identifier?: string;
  error?: string;
}

export interface NetworkCardState extends NetworkState {
  label: string;
  descriptionKey: TranslationKey;
  identifierLabelKey: TranslationKey;
}

export interface NetworkStatusDataService {
  getState(
    connection: RepositoryConnection,
    pending: boolean,
  ): NetworkCardState;
}

export function resolveNetworkState(
  connection: RepositoryConnection,
  pending: boolean,
): NetworkState {
  if (pending) {
    return { status: NetworkStatuses.Connecting };
  }
  return {
    status: connection.connected
      ? NetworkStatuses.Connected
      : NetworkStatuses.Disconnected,
    identifier: connection.identifier,
    error: connection.error,
  };
}
