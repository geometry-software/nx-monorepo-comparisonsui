import {
  closeSession,
  createSession,
  getCurrentSession,
  getSession,
  getSessionRepositoryConnections,
  refreshCurrentSession,
  verifySession,
} from "./session";

export const accountDataService = {
  getSession,
  getCurrentSession,
  getRepositoryConnections: getSessionRepositoryConnections,
  createSession,
  updateSession: refreshCurrentSession,
  verifySession,
  closeSession,
};
