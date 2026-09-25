import { useCallback, useRef, useState } from "react";
import { FileCode2, FileUp, RefreshCw, Trash2 } from "lucide-react";
import {
  Button, Card, CardContent, CardHeader, CardTitle, Checkbox, ConfirmDialog, EmptyList,
} from "@cui/ui/components";
import type { NotificationPayload } from "@cui/ui/components";
import type { Compute, DataSourceSummary } from "../../services/data-source.types";
import type { Benchmark, BenchmarkReport, RecordBenchmarkSample } from "../../services/benchmark.types";
import { benchmarkService } from "../../services/benchmark.service";
import { BenchmarkReportDialog } from "./benchmark-report-dialog";
import { BenchmarkFileImportDialog } from './benchmark-file-import-dialog';
import { ComputeSourceCard } from "./compute-source-card";
import { ServerModelDialog } from './server-model-dialog';

export function ComputeCard({
  compute,
  initialBenchmark,
  active,
  snapshots,
  onComputeRefresh,
  onSourceUpdated,
  onDelete,
  deletingAll,
  selected,
  selectionDisabled,
  onToggleSelection,
  onNotification,
}: {
  compute: Compute;
  initialBenchmark?: Benchmark | null;
  active: boolean;
  snapshots: DataSourceSummary[];
  onComputeRefresh: (computeId: string) => Promise<"refreshed" | "missing">;
  onSourceUpdated: (sourceId: string) => Promise<void>;
  onDelete: (computeId: string) => Promise<void>;
  deletingAll: boolean;
  selected: boolean;
  selectionDisabled: boolean;
  onToggleSelection: () => void;
  onNotification: (payload: NotificationPayload) => void;
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string>();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string>();
  const benchmark = initialBenchmark ?? null;
  const [benchmarkError, setBenchmarkError] = useState<string>();
  const [reportOpen, setReportOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importedReport, setImportedReport] = useState<{ report: BenchmarkReport; file: File } | null>(null);
  const benchmarkRef = useRef(benchmark);
  benchmarkRef.current = benchmark;

  const recordMeasurement = useCallback((measurement: Omit<RecordBenchmarkSample, "runId">) => {
    const recording = benchmarkRef.current;
    if (recording?.status !== "recording") return;
    void benchmarkService.recordSample(compute.id, {
      ...measurement,
      runId: recording.runId,
    }).catch((error) => setBenchmarkError(error instanceof Error ? error.message : "Unable to record benchmark."));
  }, [compute.id]);

  async function refreshCompute() {
    setRefreshing(true);
    setRefreshError(undefined);
    try {
      const result = await onComputeRefresh(compute.id);
      if (result === "missing") {
        onNotification({ type: 'error', message: 'This in-memory compute no longer exists. The Data Source service may have restarted; the list was updated.' });
      } else {
        onNotification({ type: 'success', message: `${compute.name} sources refreshed.` });
      }
    } catch (error) {
      setRefreshError(error instanceof Error ? error.message : "Unable to refresh compute.");
    } finally {
      setRefreshing(false);
    }
  }

  async function deleteSelectedCompute() {
    setDeleting(true);
    setDeleteError(undefined);
    try {
      await onDelete(compute.id);
      setConfirmDelete(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Unable to delete compute.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Checkbox aria-label={`Select server ${compute.name} for benchmark`} checked={selected} disabled={selectionDisabled} onCheckedChange={onToggleSelection} title={selectionDisabled ? 'Stop the active benchmark before changing the server selection.' : undefined} />
            <CardTitle>Server {compute.name}</CardTitle>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button onClick={() => setModelOpen(true)} size="sm" variant="outline">
              <FileCode2 /> Server Model
            </Button>
            <Button onClick={() => setImportOpen(true)} size="sm" variant="outline">
              <FileUp /> Import File
            </Button>
            <Button disabled={refreshing || deleting || deletingAll} onClick={() => void refreshCompute()} size="sm" variant="outline">
              <RefreshCw className={refreshing ? "animate-spin" : undefined} /> Update
            </Button>
            <Button disabled={refreshing || deleting || deletingAll || benchmark?.status === "recording"} onClick={() => setConfirmDelete(true)} size="sm" variant="destructive">
              <Trash2 /> Delete
            </Button>
          </div>
        </div>
        <dl className="grid w-full grid-cols-2 gap-4 text-xs md:grid-cols-3 xl:grid-cols-7">
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Server Name</dt>
            <dd className="break-words">{compute.name}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Description</dt>
            <dd className="break-words">{compute.description}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Period</dt>
            <dd className="break-words">
              <span className="block">
                {compute.periodModel.values.length} {compute.periodModel.unit === "year"
                  ? compute.periodModel.values.length === 1 ? "year" : "years"
                  : compute.periodModel.values.length === 1 ? "day" : "days"}
              </span>
              <span className="block">({compute.periodModel.name})</span>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Created</dt>
            <dd>{new Date(compute.createdAt).toLocaleString()}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Instance Number</dt>
            <dd>{compute.instanceCount ?? compute.sourceIds.length}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground" title="Total size of all instance numeric values serialized as JSON; this is not JavaScript heap memory or calculation time.">
              Total Footprint
            </dt>
            <dd>{compute.numericDataSizeBytes === undefined ? "—" : `${compute.numericDataSizeBytes} B`}</dd>
          </div>
          <div className="min-w-0">
            <dt className="font-medium text-muted-foreground">Last Update</dt>
            <dd className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full" style={{ backgroundColor: compute.lastUpdatedAt ? "#008000" : undefined }} />
              {compute.lastUpdatedAt ? new Date(compute.lastUpdatedAt).toLocaleString() : "—"}
            </dd>
          </div>
        </dl>
        {refreshError && <p className="text-sm text-destructive" role="alert">{refreshError}</p>}
        {benchmarkError && <p className="text-sm text-destructive" role="alert">{benchmarkError}</p>}
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {compute.sourceIds.map((sourceId, index) => {
          const snapshot = snapshots.find(({ source }) => source.id === sourceId);
          return snapshot ? (
            <ComputeSourceCard key={sourceId} snapshot={snapshot} compute={compute} instanceNumber={index + 1} onSourceUpdated={onSourceUpdated} onConnectionMeasured={recordMeasurement} connectionIntervalSeconds={benchmark?.status === "recording" ? benchmark.intervalSeconds : 5} active={active} />
          ) : null;
        })}
        {!compute.sourceIds.length && <EmptyList className="sm:col-span-2 xl:col-span-3" />}
      </CardContent>
      <BenchmarkReportDialog
        benchmark={null}
        benchmarks={importedReport?.report.servers}
        importedFile={importedReport?.file}
        onImportRequest={() => { setReportOpen(false); setImportOpen(true); }}
        onOpenChange={setReportOpen}
        open={reportOpen}
      />
      <ServerModelDialog compute={compute} onOpenChange={setModelOpen} open={modelOpen} />
      <BenchmarkFileImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImported={(report, file) => {
          setImportedReport({ report, file });
          setImportOpen(false);
          setReportOpen(true);
        }}
      />
      <ConfirmDialog
        busy={deleting}
        error={deleteError}
        itemName={compute.name}
        labels={{
          title: "Delete Compute",
          description: "Delete “{{name}}” and release its sources?",
          note: "Source data will remain available.",
          cancel: "Cancel",
          pending: "Deleting compute…",
          confirm: "Delete",
        }}
        onClose={() => {
          setConfirmDelete(false);
          setDeleteError(undefined);
        }}
        onConfirm={() => void deleteSelectedCompute()}
        open={confirmDelete}
      />
    </Card>
  );
}
