import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button, EmptyList } from "@cui/ui/components";
import type { NotificationPayload } from "@cui/ui/components";
import type { Compute, DataSourceSummary, Period } from "../../services/data-source.types";
import { sourceService } from "../../services/source.service";
import { AddSourceDialog } from "./add-source-dialog";
import { CreateComputeDialog } from "./create-compute-dialog";
import { SourceListItem } from "./source-card";

export function SourcesActions({
  snapshots,
  computes,
  periods,
  selectedSourceIds,
  onSelectionChange,
  onCreated,
  onRefreshAll,
  onSave,
  onComputeCreated,
  onVerifyAccountSession,
  onNotification,
}: {
  snapshots: DataSourceSummary[];
  computes: Compute[];
  periods: Period[];
  selectedSourceIds: string[];
  onSelectionChange: (sourceIds: string[]) => void;
  onCreated: (sourceId: string) => Promise<void>;
  onRefreshAll: () => Promise<void>;
  onSave: (name: string, description: string, periodId: string, accountSessionId: number) => Promise<void>;
  onComputeCreated: () => void;
  onVerifyAccountSession: () => Promise<number>;
  onNotification: (payload: NotificationPayload) => void;
}) {
  const [refreshingSources, setRefreshingSources] = useState(false);
  const attachedSourceIds = new Set(computes.flatMap((compute) => compute.sourceIds));
  const availableSourceIds = snapshots
    .filter(({ source, metaError }) => !attachedSourceIds.has(source.id) && !metaError)
    .map(({ source }) => source.id);

  async function refreshSources() {
    setRefreshingSources(true);
    try {
      await onRefreshAll();
      onNotification({ type: 'success', message: 'Sources refreshed.' });
    } catch (error) {
      onNotification({ type: 'error', message: error instanceof Error ? error.message : 'Unable to refresh sources.' });
    } finally {
      setRefreshingSources(false);
    }
  }

  return (
    <>
      <Button disabled={refreshingSources} onClick={() => void refreshSources()} variant="outline">
        <RefreshCw className={refreshingSources ? "animate-spin" : undefined} /> Refresh Sources
      </Button>
      <AddSourceDialog onCreated={onCreated} />
      <CreateComputeDialog
        availableSourceIds={availableSourceIds}
        onSelectAllSources={onSelectionChange}
        onSelectionChange={onSelectionChange}
        onRefreshSources={onRefreshAll}
        onSave={onSave}
        onCreated={onComputeCreated}
        onVerifyAccountSession={onVerifyAccountSession}
        selectedCount={selectedSourceIds.length}
        selectedSourceIds={selectedSourceIds}
        snapshots={snapshots}
        computes={computes}
        periods={periods}
      />
    </>
  );
}

export function SourcesTab({
  snapshots,
  computes,
  selectedSourceIds,
  onSelectionChange,
  onSourceUpdated,
  onSourceDeleted,
  onNotification,
}: {
  snapshots: DataSourceSummary[];
  computes: Compute[];
  selectedSourceIds: string[];
  onSelectionChange: (sourceIds: string[]) => void;
  onSourceUpdated: (snapshot: DataSourceSummary) => void;
  onSourceDeleted: (sourceId: string) => void;
  onNotification: (payload: NotificationPayload) => void;
}) {
  async function refreshSource(sourceId: string) {
    onSourceUpdated(await sourceService.refreshSource(sourceId));
    onNotification({ type: 'success', message: 'Source refreshed.' });
  }

  async function clearSourceData(sourceId: string) {
    onSourceUpdated(await sourceService.clearSourceData(sourceId));
    onNotification({ type: 'success', message: 'Source reset.' });
  }

  async function deleteSource(sourceId: string) {
    await sourceService.deleteSource(sourceId);
    onSourceDeleted(sourceId);
    onNotification({ type: 'success', message: 'Source deleted.' });
  }

  function toggleSelection(sourceId: string) {
    onSelectionChange(
      selectedSourceIds.includes(sourceId)
        ? selectedSourceIds.filter((id) => id !== sourceId)
        : [...selectedSourceIds, sourceId],
    );
  }

  return (
    <div className="space-y-3">
      {snapshots.map((snapshot) => {
        const parent = computes.find((compute) =>
          compute.sourceIds.includes(snapshot.source.id),
        );
        return (
          <SourceListItem
            key={snapshot.source.id}
            onClear={clearSourceData}
            onDelete={deleteSource}
            onRefresh={refreshSource}
            onToggleSelection={toggleSelection}
            selected={selectedSourceIds.includes(snapshot.source.id)}
            compute={parent}
            snapshot={snapshot}
          />
        );
      })}
      {!snapshots.length && <EmptyList />}
    </div>
  );
}
