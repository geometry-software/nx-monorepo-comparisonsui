import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import {
  Alert, AlertDescription, Badge, Button, Card, CardContent, CardDescription,
  CardHeader, CardTitle,
} from "@cui/ui/components";
import { formatDateTimeToSeconds } from "../lib/format-date";
import { CreateSessionButton, RepositoryStatus, SessionCardsSkeleton, SessionValue } from "./account/account-components";
import { useAccountSession } from "./account/use-account-session";

export function Account() {
  const {
    language, translate: t, error, supabaseNetworkState, firebaseNetworkState,
    initializing, session, providersConnected, loading, updating, verifying,
    closing, connect, update, verify, close,
  } = useAccountSession();

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
                label={t("account.verification")}
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
            updating ||
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
            updating ||
            verifying ||
            closing ||
            initializing ||
            !session?.active
          }
          onClick={update}
          variant="outline"
        >
          <RefreshCw className={updating ? "animate-spin" : undefined} />
          {updating ? t("account.updating") : t("account.updateSession")}
        </Button>
        <Button
          disabled={
            loading ||
            updating ||
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
            updating ||
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
