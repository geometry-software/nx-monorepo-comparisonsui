import { useState } from "react";
import { ChartNoAxesCombined, Gauge, LoaderCircle, Square, Trash2 } from "lucide-react";
import { Button, ConfirmDialog, EmptyList, Input, Label } from "@cui/ui/components";
import type { NotificationPayload } from "@cui/ui/components";
import type { Compute, DataSourceSummary } from "../../services/data-source.types";
import type { Benchmark, BenchmarkReport } from "../../services/benchmark.types";
import { computeService } from "../../services/compute.service";
import { benchmarkService } from "../../services/benchmark.service";
import { ComputeCard } from "./compute-card";
import { BenchmarkReportDialog } from "./benchmark-report-dialog";
import { BenchmarkFileImportDialog } from "./benchmark-file-import-dialog";

export function ComputeActions({ computes, benchmarks, selectedComputeIds, trackedComputeIds, onRefresh, deletingAll, onDeletingAllChange, onTrackStarted, onTrackStopped, onNotification }: {
  computes: Compute[];
  benchmarks: Record<string, Benchmark | null>;
  selectedComputeIds: string[];
  trackedComputeIds: string[];
  onRefresh: () => Promise<void>;
  deletingAll: boolean;
  onDeletingAllChange: (deleting: boolean) => void;
  onTrackStarted: (benchmarks: Benchmark[]) => void;
  onTrackStopped: (benchmarks: Benchmark[]) => void;
  onNotification: (payload: NotificationPayload) => void;
}) {
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [deleteError, setDeleteError] = useState<string>();
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackBusy, setTrackBusy] = useState(false);
  const [trackError, setTrackError] = useState<string>();
  const [stopOpen, setStopOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importedReport, setImportedReport] = useState<{ report: BenchmarkReport; file: File } | null>(null);
  const [intervalInput, setIntervalInput] = useState("5");
  const selectedComputes = computes.filter(({ id }) => selectedComputeIds.includes(id));
  const activeTrackedIds = trackedComputeIds.filter((id) => computes.some((compute) => compute.id === id));
  const trackedBenchmarks = activeTrackedIds.map((id) => benchmarks[id]).filter((value): value is Benchmark => Boolean(value));
  const intervalValid = /^(?:[0-9]|10)$/.test(intervalInput);
  const benchmarkStatusLoading = selectedComputes.some(({ id }) => !Object.hasOwn(benchmarks, id));
  const benchmarkRecording = computes.some(({ id }) => benchmarks[id]?.status === 'recording');
  const trackedRecording = trackedBenchmarks.some(({ status }) => status === 'recording');
  const trackingUnavailable = benchmarkStatusLoading || benchmarkRecording || deletingAll || trackBusy;
  const reportReady = activeTrackedIds.length > 0 && trackedBenchmarks.length === activeTrackedIds.length &&
    trackedBenchmarks.every(({ status }) => status === "stopped");

  async function startTracking() {
    if (!selectedComputes.length || !intervalValid || trackingUnavailable) return;
    setTrackBusy(true);
    setTrackError(undefined);
    try {
      const results = await Promise.allSettled(selectedComputes.map(({ id }) => benchmarkService.start(id, Number(intervalInput))));
      const started = results.filter((result): result is PromiseFulfilledResult<Benchmark> => result.status === "fulfilled").map(({ value }) => value);
      const failed = results.find((result): result is PromiseRejectedResult => result.status === "rejected");
      if (failed) {
        const rollback = await Promise.allSettled(started.map(({ computeId, runId }) => benchmarkService.stop(computeId, runId)));
        const stillRecording = started.filter((_, index) => rollback[index].status === "rejected");
        if (stillRecording.length) onTrackStarted(stillRecording);
        throw failed.reason;
      }
      onTrackStarted(started);
      setTrackOpen(false);
      onNotification({ type: 'success', message: `Recording benchmark for ${started.length} ${started.length === 1 ? 'server' : 'servers'}.` });
    } catch (error) {
      setTrackError(error instanceof Error ? error.message : "Unable to start benchmark recording.");
    } finally {
      setTrackBusy(false);
    }
  }

  async function stopTracking() {
    if (!trackedRecording || trackBusy) return;
    setTrackBusy(true);
    setTrackError(undefined);
    const recording = trackedBenchmarks.filter(({ status }) => status === "recording");
    const results = await Promise.allSettled(recording.map(({ computeId, runId }) => benchmarkService.stop(computeId, runId)));
    const stopped = results.filter((result): result is PromiseFulfilledResult<Benchmark> => result.status === "fulfilled").map(({ value }) => value);
    if (stopped.length) onTrackStopped(stopped);
    const failed = results.find((result): result is PromiseRejectedResult => result.status === "rejected");
    if (failed) setTrackError(failed.reason instanceof Error ? failed.reason.message : "Unable to stop every server benchmark.");
    else { setStopOpen(false); onNotification({ type: 'success', message: 'Benchmark report is ready.' }); }
    setTrackBusy(false);
  }

  async function deleteAllComputes() {
    onDeletingAllChange(true);
    setDeleteError(undefined);
    try {
      const result = await computeService.deleteAllComputes();
      await onRefresh();
      setConfirmDeleteAll(false);
      onNotification({ type: 'success', message: `${result.deleted} ${result.deleted === 1 ? 'compute' : 'computes'} deleted and their sources released.` });
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Unable to delete computes.");
    } finally {
      onDeletingAllChange(false);
    }
  }

  return (
    <>
      <Button
        disabled={!selectedComputes.length || trackingUnavailable}
        onClick={() => {
          setIntervalInput("5");
          setTrackError(undefined);
          setTrackOpen(true);
        }}
        size="sm"
        title={benchmarkRecording ? "Stop the current benchmark recording before starting another."
          : !selectedComputes.length ? "Select at least one server to track."
            : benchmarkStatusLoading ? "Loading server benchmark status." : undefined}
        variant="outline"
      >
        {benchmarkRecording ? <LoaderCircle className="animate-spin" /> : <Gauge />} Track Benchmark ({selectedComputes.length})
      </Button>
      {trackedRecording && <Button disabled={trackBusy} onClick={() => setStopOpen(true)} size="sm" variant="outline"><Square /> Stop Benchmark</Button>}
      {reportReady && <Button onClick={() => { setImportedReport(null); setReportOpen(true); }} size="sm" variant="outline"><ChartNoAxesCombined /> Benchmark Report ({trackedBenchmarks.length})</Button>}
      <Button disabled={!computes.length || deletingAll || benchmarkRecording} onClick={() => setConfirmDeleteAll(true)} size="sm" variant="destructive">
        <Trash2 /> Delete All
      </Button>
      <ConfirmDialog
        busy={trackBusy}
        confirmDisabled={!selectedComputes.length || !intervalValid || trackingUnavailable}
        error={trackError}
        itemName={`${selectedComputes.length} ${selectedComputes.length === 1 ? "server" : "servers"}`}
        labels={{
          title: "Track Benchmark",
          description: "Start recording connection update times and footprints for every instance across {{name}}?",
          cancel: "Cancel",
          pending: "Starting benchmark…",
          confirm: "Start Benchmark",
        }}
        onClose={() => { setTrackOpen(false); setTrackError(undefined); }}
        onConfirm={() => void startTracking()}
        open={trackOpen}
        tone="confirm"
      >
        <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border p-3 text-sm">
          {selectedComputes.map(({ id, name }) => <p key={id}>{name}</p>)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="benchmark-frequency">Update frequency (seconds)</Label>
          <Input
            aria-invalid={!intervalValid}
            id="benchmark-frequency"
            inputMode="numeric"
            onChange={(event) => setIntervalInput(event.target.value)}
            pattern="[0-9]*"
            value={intervalInput}
          />
          {!intervalValid && <p className="text-sm text-destructive" role="alert">Enter a whole number from 0 to 10.</p>}
          <p className="text-xs text-muted-foreground">0 starts the next check as soon as the previous one finishes. Outside tracking, checks run every 5 seconds.</p>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        busy={trackBusy}
        error={trackError}
        itemName={`${activeTrackedIds.length} ${activeTrackedIds.length === 1 ? "server" : "servers"}`}
        labels={{ title: "Stop Benchmark", description: "Stop the benchmark across {{name}}?", cancel: "Continue Benchmark", pending: "Saving benchmark reports…", confirm: "Stop Benchmark" }}
        onClose={() => { setStopOpen(false); setTrackError(undefined); }}
        onConfirm={() => void stopTracking()}
        open={stopOpen}
        tone="warn"
      />
      <BenchmarkReportDialog benchmark={null} benchmarks={importedReport?.report.servers ?? (reportReady ? trackedBenchmarks : [])} importedFile={importedReport?.file} onImportRequest={() => { setReportOpen(false); setImportOpen(true); }} onOpenChange={setReportOpen} open={reportOpen} />
      <BenchmarkFileImportDialog open={importOpen} onOpenChange={setImportOpen} onImported={(report, file) => { setImportedReport({ report, file }); setImportOpen(false); setReportOpen(true); }} />
      <ConfirmDialog
        busy={deletingAll}
        error={deleteError}
        itemName={`${computes.length} ${computes.length === 1 ? "compute" : "computes"}`}
        labels={{
          title: "Delete All Computes",
          description: "Delete {{name}} and release all their sources?",
          note: "Source data will remain available.",
          cancel: "Cancel",
          pending: "Deleting computes…",
          confirm: "Delete All",
        }}
        onClose={() => {
          setConfirmDeleteAll(false);
          setDeleteError(undefined);
        }}
        onConfirm={() => void deleteAllComputes()}
        open={confirmDeleteAll}
      />
    </>
  );
}

export function ComputeTab({ computes, snapshots, onRefresh, onComputeRefresh, onSourceUpdated, deletingAll, benchmarks, active, selectedComputeIds, onSelectionChange, onNotification }: {
  computes: Compute[];
  snapshots: DataSourceSummary[];
  onRefresh: () => Promise<void>;
  onComputeRefresh: (computeId: string) => Promise<"refreshed" | "missing">;
  onSourceUpdated: (sourceId: string) => Promise<void>;
  deletingAll: boolean;
  benchmarks: Record<string, Benchmark | null>;
  active: boolean;
  selectedComputeIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onNotification: (payload: NotificationPayload) => void;
}) {
  const selectionDisabled = computes.some(({ id }) => benchmarks[id]?.status === 'recording');

  async function deleteCompute(computeId: string) {
    await computeService.deleteCompute(computeId);
    await onRefresh();
    onNotification({ type: 'success', message: 'Compute deleted and its sources released.' });
  }

  return (
    <div className="space-y-4">
      {computes.map((compute) => (
        <ComputeCard
          key={`${compute.id}:${benchmarks[compute.id]?.runId ?? ""}`}
          compute={compute}
          initialBenchmark={benchmarks[compute.id]}
          active={active}
          snapshots={snapshots}
          onComputeRefresh={onComputeRefresh}
          onSourceUpdated={onSourceUpdated}
          onDelete={deleteCompute}
          deletingAll={deletingAll}
          selected={selectedComputeIds.includes(compute.id)}
          selectionDisabled={selectionDisabled}
          onToggleSelection={() => {
            if (selectionDisabled) return;
            onSelectionChange(selectedComputeIds.includes(compute.id)
              ? selectedComputeIds.filter((id) => id !== compute.id)
              : [...selectedComputeIds, compute.id]);
          }}
          onNotification={onNotification}
        />
      ))}
      {!computes.length && <EmptyList />}
    </div>
  );
}
