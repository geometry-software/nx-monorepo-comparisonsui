import { useEffect, useState } from "react";
import { toast } from "@cui/ui/components";
import { useI18n } from "../../app/i18n";
import { NetworkStatuses } from "../../models/network-state";
import { firebaseNetworkStatusDataService } from "../../services/firebase-network-status.data-service";
import { supabaseNetworkStatusDataService } from "../../services/supabase-network-status.data-service";
import { accountDataService } from "../../services/account.data-service";
import type { SessionRepositoryConnections } from "../../services/session";

export function useAccountSession() {
  const { language, t: translate } = useI18n();
  const [repositoryConnections, setRepositoryConnections] =
    useState<SessionRepositoryConnections>({
      firebase: { connected: false },
      supabase: { connected: false },
    });
  const [session, setSession] = useState(accountDataService.getSession());
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState("");
  const firebaseNetworkState = firebaseNetworkStatusDataService.getState(
    repositoryConnections.firebase,
    initializing,
  );
  const supabaseNetworkState = supabaseNetworkStatusDataService.getState(
    repositoryConnections.supabase,
    initializing,
  );
  const providersConnected =
    firebaseNetworkState.status === NetworkStatuses.Connected &&
    supabaseNetworkState.status === NetworkStatuses.Connected;

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      const [connectionsResult, sessionResult] = await Promise.allSettled([
        accountDataService.getRepositoryConnections(),
        accountDataService.getCurrentSession(),
      ]);
      if (cancelled) return;

      if (connectionsResult.status === "fulfilled") {
        setRepositoryConnections(connectionsResult.value);
      } else {
        const connectionError =
          connectionsResult.reason instanceof Error
            ? connectionsResult.reason.message
            : "Auth service unavailable";
        setRepositoryConnections({
          firebase: { connected: false, error: connectionError },
          supabase: { connected: false, error: connectionError },
        });
      }

      if (sessionResult.status === "fulfilled") {
        setSession(sessionResult.value);
      } else {
        const restoreError = sessionResult.reason instanceof Error
          ? sessionResult.reason.message
          : translate("account.restoreError");
        setSession(accountDataService.getSession());
        setError(restoreError);
        toast.error(restoreError);
      }

      setInitializing(false);
    }

    void initialize();
    return () => {
      cancelled = true;
    };
  }, []);

  async function connect() {
    setLoading(true);
    setError("");
    try {
      const created = await accountDataService.createSession();
      setSession(created);
      toast.success(translate("account.sessionReceived"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : translate("account.createError"),
      );
    } finally {
      setLoading(false);
    }
  }

  async function update() {
    setUpdating(true);
    setError("");
    try {
      const updated = await accountDataService.updateSession();
      setSession(updated);
      toast.success(translate("account.sessionUpdated"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : translate("account.updateError"),
      );
    } finally {
      setUpdating(false);
    }
  }

  async function verify() {
    setVerifying(true);
    setError("");
    try {
      const result = await accountDataService.verifySession();
      setSession((current) =>
        current
          ? {
              ...current,
              verified: result.verified,
              verifiedAt: result.verifiedAt,
            }
          : current,
      );
      if (result.verified) {
        toast.success(translate("account.sessionVerified"));
      } else {
        toast.error(translate("account.sessionNotVerified"));
      }
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : translate("account.verifyError"),
      );
    } finally {
      setVerifying(false);
    }
  }

  async function close() {
    setClosing(true);
    setError("");
    try {
      await accountDataService.closeSession();
      window.location.reload();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : translate("account.closeError"),
      );
      setClosing(false);
    }
  }

  return {
    language, translate, error, supabaseNetworkState, firebaseNetworkState,
    initializing, session, providersConnected, loading, updating, verifying,
    closing, connect, update, verify, close,
  };
}
