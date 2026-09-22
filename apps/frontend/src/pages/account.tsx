import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  toast,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@cui/ui/components";
import { useI18n, type I18nValue } from "../app/i18n";
import { formatDateTimeToSeconds } from "../lib/format-date";
import {
  NetworkStatuses,
  type NetworkCardState,
  type NetworkStatus,
} from "../models/network-state";
import { firebaseNetworkStatusDataService } from "../services/firebase-network-status.data-service";
import {
  closeSession,
  createSession,
  getCurrentSession,
  getSession,
  getSessionRepositoryConnections,
  type SessionRepositoryConnections,
  verifySession,
} from "../services/session";
import { supabaseNetworkStatusDataService } from "../services/supabase-network-status.data-service";

export function Account() {
  const { language, t } = useI18n();
  const [repositoryConnections, setRepositoryConnections] =
    useState<SessionRepositoryConnections>({
      firebase: { connected: false },
      supabase: { connected: false },
    });
  const [session, setSession] = useState(getSession());
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
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
        getSessionRepositoryConnections(),
        getCurrentSession(),
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
        toast.error(
          sessionResult.reason instanceof Error
            ? sessionResult.reason.message
            : t("account.restoreError"),
        );
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
      const created = await createSession();
      setSession(created);
      toast.success(t("account.sessionReceived"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : t("account.createError"),
      );
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setVerifying(true);
    setError("");
    try {
      const result = await verifySession();
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
        toast.success(t("account.sessionVerified"));
      } else {
        toast.error(t("account.sessionNotVerified"));
      }
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : t("account.verifyError"),
      );
    } finally {
      setVerifying(false);
    }
  }

  async function close() {
    setClosing(true);
    setError("");
    try {
      await closeSession();
      window.location.reload();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : t("account.closeError"),
      );
      setClosing(false);
    }
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">
          {t("account.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          {t("account.description")}
        </p>
      </header>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4 [&>*]:min-h-[165px] sm:grid-cols-2 xl:grid-cols-4">
        <RepositoryStatus
          state={supabaseNetworkState}
          t={t}
        />
        <RepositoryStatus
          state={firebaseNetworkState}
          t={t}
        />
        {initializing ? (
          <SessionCardsSkeleton />
        ) : !session ? (
          <Card className="flex flex-col sm:col-span-2 xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{t("account.sessionStartup")}</CardTitle>
                <Badge
                  className="border-[#1E90FF] bg-[#F0F8FF] text-[#0000CD]"
                  variant="outline"
                >
                  {t("account.connect")}
                </Badge>
              </div>
              <CardDescription>
                {t("account.startupDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-sm text-muted-foreground">
                {t("account.createInstruction")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <SessionValue
              badge={t("account.statusConnected")}
              badgeClassName="border-[#3CB371] bg-[#F0FFF0] text-[#2E8B57]"
              description={t("account.sessionDescription")}
              label={t("account.session")}
              valueLabel="session_id"
              value={String(session.sessionId)}
            />
            {session.verified ? (
              <SessionValue
                badge={t("account.statusConnected")}
                badgeClassName="border-[#3CB371] bg-[#F0FFF0] text-[#2E8B57]"
                description={t("account.verifiedDescription")}
                label={t("account.timestamp")}
                value={
                  session.verifiedAt
                    ? formatDateTimeToSeconds(session.verifiedAt, language)
                    : "—"
                }
                valueLabel="verified_at"
              />
            ) : (
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{t("account.verify")}</CardTitle>
                    <Badge
                      className="border-[#1E90FF] bg-[#F0F8FF] text-[#0000CD]"
                      variant="outline"
                    >
                      {t("account.connect")}
                    </Badge>
                  </div>
                  <CardDescription>
                    {t("account.verifyDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="text-sm text-muted-foreground">
                    {t("account.verifyInstruction")}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <CreateSessionButton
          disabled={
            loading ||
            verifying ||
            closing ||
            initializing ||
            !providersConnected ||
            Boolean(session?.active)
          }
          loading={loading}
          providersConnected={providersConnected}
          t={t}
          onClick={connect}
        />
        <Button
          disabled={
            loading ||
            verifying ||
            closing ||
            initializing ||
            !session?.active
          }
          onClick={verify}
          variant="outline"
        >
          <ShieldCheck />
          {verifying ? t("account.verifying") : t("account.verifySession")}
        </Button>
        <Button
          disabled={
            loading ||
            verifying ||
            closing ||
            initializing ||
            !session?.active
          }
          onClick={close}
          variant="destructive"
        >
          <LogOut />
          {closing ? t("account.closing") : t("account.closeSession")}
        </Button>
      </div>
    </section>
  );
}

function CreateSessionButton({
  disabled,
  loading,
  providersConnected,
  t,
  onClick,
}: {
  disabled: boolean;
  loading: boolean;
  providersConnected: boolean;
  t: I18nValue["t"];
  onClick: () => void;
}) {
  const button = (
    <Button
      className={providersConnected ? undefined : "pointer-events-none"}
      disabled={disabled}
      onClick={onClick}
    >
      <RefreshCw className={loading ? "animate-spin" : undefined} />
      {loading ? t("account.creating") : t("account.createSession")}
    </Button>
  );

  if (providersConnected) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex" tabIndex={0}>
          {button}
        </span>
      </TooltipTrigger>
      <TooltipContent>{t("account.connectProviders")}</TooltipContent>
    </Tooltip>
  );
}

function SessionCardsSkeleton() {
  return (
    <Card className="flex flex-col sm:col-span-2 xl:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardHeader>
      <CardContent className="mt-auto grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}

function RepositoryStatus({
  state,
  t,
}: {
  state: NetworkCardState;
  t: I18nValue["t"];
}) {
  const connected = state.status === NetworkStatuses.Connected;
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{state.label}</CardTitle>
          <Badge
            className={
              connected
                ? "border-[#3CB371] bg-[#F0FFF0] text-[#2E8B57]"
                : "border-[#A9A9A9] bg-[#F5F5F5] text-[#696969]"
            }
            variant="outline"
          >
            {networkStatusLabel(state.status, t)}
          </Badge>
        </div>
        <CardDescription>{t(state.descriptionKey)}</CardDescription>
      </CardHeader>
      {state.identifier && (
        <CardContent className="mt-auto">
          <span className={cardValueLabelClassName}>
            {t(state.identifierLabelKey)}
          </span>
          <code className="mt-1 block break-all rounded bg-muted/40 px-2 py-1 text-xs text-foreground">
            {state.identifier}
          </code>
        </CardContent>
      )}
    </Card>
  );
}

function networkStatusLabel(
  status: NetworkStatus,
  t: I18nValue["t"],
): string {
  if (status === NetworkStatuses.Connecting) {
    return t("account.statusConnecting");
  }
  if (status === NetworkStatuses.Connected) {
    return t("account.statusConnected");
  }
  return t("account.statusDisconnected");
}

function SessionValue({
  badge,
  badgeClassName,
  description,
  label,
  value,
  valueLabel,
}: {
  badge: string;
  badgeClassName?: string;
  description: string;
  label: string;
  value: string;
  valueLabel?: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{label}</CardTitle>
          <Badge className={badgeClassName} variant="outline">
            {badge}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        {valueLabel && (
          <span className={cardValueLabelClassName}>{valueLabel}</span>
        )}
        <code className="mt-1 block break-all rounded bg-muted/40 px-2 py-1 text-xs text-foreground">
          {value}
        </code>
      </CardContent>
    </Card>
  );
}

const cardValueLabelClassName =
  "block text-[11px] font-medium uppercase tracking-wide text-muted-foreground";
