import { RefreshCw } from "lucide-react";
import {
  Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle,
  Skeleton, Tooltip, TooltipContent, TooltipTrigger,
} from "@cui/ui/components";
import type { I18nValue } from "../../app/i18n";
import { NetworkStatuses, type NetworkCardState, type NetworkStatus } from "../../models/network-state";

export function CreateSessionButton({
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

export function SessionCardsSkeleton() {
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

export function RepositoryStatus({
  state,
  t,
}: {
  state: NetworkCardState;
  t: I18nValue["t"];
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{state.label}</CardTitle>
          <Badge
            className={
              state.status === NetworkStatuses.Connected
                ? "border-[#3CB371] bg-[#F0FFF0] text-[#2E8B57]"
                : state.status === NetworkStatuses.Disconnected
                  ? "border-error bg-error/10 text-error"
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

export function SessionValue({
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
