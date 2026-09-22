import type {
  NetworkStatusDataService,
  NetworkCardState,
} from "../models/network-state";
import { resolveNetworkState } from "../models/network-state";
import type { RepositoryConnection } from "./session";

class FirebaseNetworkStatusDataService implements NetworkStatusDataService {
  getState(
    connection: RepositoryConnection,
    pending: boolean,
  ): NetworkCardState {
    return {
      label: "Firebase",
      descriptionKey: "account.firebaseDescription",
      identifierLabelKey: "account.projectId",
      ...resolveNetworkState(connection, pending),
    };
  }
}

export const firebaseNetworkStatusDataService =
  new FirebaseNetworkStatusDataService();
