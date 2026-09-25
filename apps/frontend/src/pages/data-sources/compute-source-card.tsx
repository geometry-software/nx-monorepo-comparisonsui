import { useCallback, useEffect, useRef, useState } from "react";
import { Clock3, Timer } from "lucide-react";
import { Button } from "@cui/ui/components";
import type { Compute, DataSourceSummary } from "../../services/data-source.types";
import { computeService } from "../../services/compute.service";
import type { RecordBenchmarkSample } from "../../services/benchmark.types";
import { sourceService } from "../../services/source.service";
import { SourceValuesDialog } from "./source-values-dialog";

type ConnectionStatus = "unknown" | "ok" | "warn" | "error";

const CONNECTION_STATUS_COLORS: Record<Exclude<ConnectionStatus, "unknown">, string> = {
  ok: "#008000",
  warn: "#ffff00",
  error: "#ff0000",
};
const lastConnectFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit",
});

function formatLastConnect(timestamp: string): string {
  const date = new Date(timestamp);
  const tenth = Math.round(date.getMilliseconds() / 100) % 10;
  return lastConnectFormatter.formatToParts(date)
    .map((part) => part.type === "second" ? `${part.value}.${tenth}` : part.value)
    .join("");
}

export function ComputeSourceCard({
  snapshot,
  compute,
  instanceNumber,
  onSourceUpdated,
  onConnectionMeasured,
  connectionIntervalSeconds = 5,
  active,
}: {
  snapshot: DataSourceSummary;
  compute: Compute;
  instanceNumber: number;
  onSourceUpdated: (sourceId: string) => Promise<void>;
  onConnectionMeasured?: (sample: Omit<RecordBenchmarkSample, "runId">) => void;
  connectionIntervalSeconds?: number;
  active: boolean;
}) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("unknown");
  const [connectionError, setConnectionError] = useState<string>();
  const [connectionUpdatedAt, setConnectionUpdatedAt] = useState<string>();
  const [latencyMs, setLatencyMs] = useState<number>();
  const [numericDataSizeBytes, setNumericDataSizeBytes] = useState<number>();
  const [activeRequests, setActiveRequests] = useState({ manual: 0, automatic: 0 });
  const [flash, setFlash] = useState({ manual: false, automatic: false });
  const baselineMs = useRef<number | undefined>(undefined);
  const footprintRef = useRef<number | undefined>(undefined);
  const onConnectionMeasuredRef = useRef(onConnectionMeasured);
  onConnectionMeasuredRef.current = onConnectionMeasured;
  const flashTimers = useRef<{
    manual?: ReturnType<typeof setTimeout>;
    automatic?: ReturnType<typeof setTimeout>;
  }>({});
  const sourceId = snapshot.source.id;
  const indicatorAnimating = activeRequests.manual > 0 || activeRequests.automatic > 0 || flash.manual || flash.automatic;

  useEffect(() => {
    if (!active) return;
    let mounted = true;
    setNumericDataSizeBytes(undefined);
    footprintRef.current = undefined;
    void computeService.getSourceNumericDataSizeBytes(sourceId)
      .then((size) => {
        if (mounted) {
          footprintRef.current = size;
          setNumericDataSizeBytes(size);
        }
      })
      .catch(() => { if (mounted) setNumericDataSizeBytes(undefined); });
    return () => { mounted = false; };
  }, [sourceId, snapshot, active]);

  const checkConnection = useCallback(async (manual = false) => {
    const kind = manual ? "manual" : "automatic";
    const startedAt = performance.now();
    setActiveRequests((current) => ({ ...current, [kind]: current[kind] + 1 }));
    setConnectionError(undefined);
    try {
      const { updatedAt, durationMs: elapsed } = await sourceService.checkSourceConnection(sourceId);
      setConnectionUpdatedAt(updatedAt);
      const baseline = baselineMs.current ?? elapsed;
      baselineMs.current = Math.min(baseline, elapsed);
      const warnThreshold = Math.max(baselineMs.current * 2, 750);
      const errorThreshold = Math.max(baselineMs.current * 4, 2_000);
      setLatencyMs(elapsed);
      onConnectionMeasuredRef.current?.({
        sourceId,
        footprintBytes: footprintRef.current,
        updateTimeMs: elapsed,
        observedAt: new Date().toISOString(),
        status: "success",
      });
      setConnectionStatus(
        elapsed >= errorThreshold ? "error" : elapsed >= warnThreshold ? "warn" : "ok",
      );
      setFlash((current) => ({ ...current, [kind]: true }));
      if (flashTimers.current[kind]) clearTimeout(flashTimers.current[kind]);
      flashTimers.current[kind] = setTimeout(
        () => setFlash((current) => ({ ...current, [kind]: false })),
        650,
      );
    } catch (reason) {
      onConnectionMeasuredRef.current?.({
        sourceId,
        footprintBytes: footprintRef.current,
        updateTimeMs: Math.max(1, Math.round(performance.now() - startedAt)),
        observedAt: new Date().toISOString(),
        status: "failed",
        errorMessage: reason instanceof Error ? reason.message : "Connection check failed.",
      });
      setConnectionStatus("error");
      setConnectionError(reason instanceof Error ? reason.message : "Connection check failed.");
    } finally {
      setActiveRequests((current) => ({
        ...current,
        [kind]: Math.max(0, current[kind] - 1),
      }));
    }
  }, [sourceId]);

  useEffect(() => {
    let active = true;
    let nextCheck: ReturnType<typeof setTimeout>;
    const poll = async () => {
      await checkConnection(false);
      if (active) nextCheck = setTimeout(() => void poll(), connectionIntervalSeconds * 1_000);
    };
    nextCheck = setTimeout(() => void poll(), 0);
    return () => {
      active = false;
      clearTimeout(nextCheck);
      if (flashTimers.current.manual) clearTimeout(flashTimers.current.manual);
      if (flashTimers.current.automatic) clearTimeout(flashTimers.current.automatic);
    };
  }, [checkConnection, connectionIntervalSeconds]);

  const statusColor = connectionStatus === "unknown"
    ? undefined
    : CONNECTION_STATUS_COLORS[connectionStatus];
  const statusDescription = connectionError
    ? `Connection error: ${connectionError}`
    : latencyMs === undefined
      ? "Checking connection"
      : `${connectionStatus.toUpperCase()} · ${Math.round(latencyMs)} ms · baseline ${Math.round(baselineMs.current ?? latencyMs)} ms`;

  return (
    <div className="min-w-0 space-y-3 rounded-lg border p-3">
      <p className="text-sm font-medium">Instance {instanceNumber}</p>
      <div className="w-full space-y-3 text-xs">
        <dl>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Instance Name</dt>
            <dd className="break-words">{compute.name} ({snapshot.source.name})</dd>
          </div>
        </dl>
        <dl className="grid w-full grid-cols-4 gap-3">
          <div className="col-span-2 min-w-0">
            <dt className="font-medium text-muted-foreground">Provider</dt>
            <dd className="truncate" title={snapshot.source.service.providerLabel}>
              {snapshot.source.service.providerLabel}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Count</dt>
            <dd>{snapshot.meta?.total ?? "—"}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground" title="Total bytes used by the numeric values when serialized as JSON; this is not JavaScript heap memory or calculation time.">
              Footprint
            </dt>
            <dd>{numericDataSizeBytes === undefined ? "—" : `${numericDataSizeBytes} B`}</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="gap-2" onClick={() => void checkConnection(true)} size="sm" variant="outline">
          <span
            aria-label={statusDescription}
            className="relative inline-flex size-3 shrink-0 items-center justify-center"
            role="img"
            title={statusDescription}
          >
            {indicatorAnimating && (
              <span
                aria-hidden="true"
                className={statusColor
                  ? "absolute inset-0 animate-ping rounded-full opacity-60"
                  : "absolute inset-0 animate-ping rounded-full bg-muted-foreground opacity-60"}
                style={statusColor ? { backgroundColor: statusColor } : undefined}
              />
            )}
            <span
              className={statusColor
                ? "relative size-2.5 rounded-full ring-1 ring-foreground/20"
                : "relative size-2.5 rounded-full bg-muted-foreground"}
              style={statusColor ? { backgroundColor: statusColor } : undefined}
            />
          </span>
          Connection
        </Button>
        <SourceValuesDialog compute={compute} mode="fill" onSaved={() => onSourceUpdated(sourceId)} sourceId={sourceId} />
        <SourceValuesDialog compute={compute} mode="show" sourceId={sourceId} />
      </div>
      <p className="flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
        <Clock3 aria-hidden="true" className="size-3 shrink-0" />
        <span className="font-medium">Timestamp:</span>
        <span>{connectionUpdatedAt
          ? formatLastConnect(connectionUpdatedAt)
          : "Connection not checked yet"}</span>
      </p>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Timer aria-hidden="true" className="size-3 shrink-0" />
        <span className="font-medium">Update Time:</span>
        <span>{latencyMs === undefined ? "—" : `${latencyMs} ms`}</span>
      </p>
    </div>
  );
}
