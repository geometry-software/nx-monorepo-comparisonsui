import type {
  NetworkStatusDataService,
  NetworkCardState,
} from "../models/network-state";
import { resolveNetworkState } from "../models/network-state";
import type { RepositoryConnection } from "./session";

class SupabaseNetworkStatusDataService implements NetworkStatusDataService {
  getState(
    connection: RepositoryConnection,
    pending: boolean,
  ): NetworkCardState {
    return {
      label: "Supabase",
      descriptionKey: "account.supabaseDescription",
      identifierLabelKey: "account.projectRef",
      ...resolveNetworkState(connection, pending),
    };
  }
}

export const supabaseNetworkStatusDataService =
  new SupabaseNetworkStatusDataService();
