import { type ReactNode, useEffect, useState } from "react";
import { Database, Eraser, Flame, HardDrive, Info, Leaf, RefreshCw, Trash2 } from "lucide-react";
import {
  Badge, Button, Card, Checkbox, ConfirmDialog, Dialog, DialogContent,
  DialogDescription, DialogHeader, DialogTitle, DialogTrigger, EmptyList,
  Tooltip, TooltipContent, TooltipTrigger,
} from "@cui/ui/components";
import type { Compute, DataSourceElement, DataSourceSummary } from "../../services/data-source.types";
import { sourceService } from "../../services/source.service";

function SourceMetadata({ snapshot, computeName }: { snapshot: DataSourceSummary; computeName?: string }) {
  const { source, meta } = snapshot;
  const ProviderIcon = source.provider === "firebase"
    ? Flame
    : source.provider === "mongodb"
      ? Leaf
      : HardDrive;
  return (
    <dl className="flex w-full gap-4 overflow-x-auto text-xs">
      <div className="min-w-32 flex-1">
        <dt className="font-medium text-muted-foreground">Source Name</dt>
        <dd className="break-words">{meta?.collection ?? source.service.collectionName}</dd>
      </div>
      <div className="min-w-32 flex-1">
        <dt className="font-medium text-muted-foreground">Compute Name</dt>
        <dd className="break-words">{computeName ?? "—"}</dd>
      </div>
      <div className="min-w-32 flex-1">
        <dt className="font-medium text-muted-foreground">Provider</dt>
        <dd className="flex items-center gap-1.5 break-words">
          <ProviderIcon aria-hidden="true" className="size-3.5 shrink-0" />
          {source.service.providerLabel}
        </dd>
      </div>
      <div className="min-w-32 flex-1">
        <dt className="font-medium text-muted-foreground">Created</dt>
        <dd>{new Date(meta?.createdAt ?? source.createdAt).toLocaleString()}</dd>
      </div>
      <div className="min-w-32 flex-1">
        <dt className="font-medium text-muted-foreground">Updated</dt>
        <dd>{source.updated ? new Date(source.updated).toLocaleString() : "—"}</dd>
      </div>
      {meta?.description && (
        <div className="min-w-32 flex-1">
          <dt className="font-medium text-muted-foreground">Description</dt>
          <dd className="break-words">{meta.description}</dd>
        </div>
      )}
    </dl>
  );
}

export function SourceListItem({
  snapshot,
  compute,
  selected,
  onToggleSelection,
  onRefresh,
  onClear,
  onDelete,
}: {
  snapshot: DataSourceSummary;
  compute?: Compute;
  selected: boolean;
  onToggleSelection: (sourceId: string) => void;
  onRefresh: (sourceId: string) => Promise<void>;
  onClear: (sourceId: string) => Promise<void>;
  onDelete: (sourceId: string) => Promise<void>;
}) {
  const { source, meta, metaError } = snapshot;
  const computeName = compute?.name;
  const [refreshing, setRefreshing] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearError, setClearError] = useState<string>();
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actionError, setActionError] = useState<string>();
  const [deleteError, setDeleteError] = useState<string>();

  async function refresh() {
    setRefreshing(true);
    setActionError(undefined);
    try {
      await onRefresh(source.id);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to refresh source.");
    } finally {
      setRefreshing(false);
    }
  }

  async function remove() {
    setDeleting(true);
    setDeleteError(undefined);
    try {
      await onDelete(source.id);
      setConfirmDelete(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Unable to delete source.");
    } finally {
      setDeleting(false);
    }
  }

  async function clear() {
    setClearing(true);
    setClearError(undefined);
    try {
      await onClear(source.id);
      setConfirmClear(false);
    } catch (error) {
      setClearError(error instanceof Error ? error.message : "Unable to clear source data.");
    } finally {
      setClearing(false);
    }
  }

  return (
    <Card size="sm" className="gap-4 p-3">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <Checkbox
            aria-label={computeName
              ? `${source.name} is attached to ${computeName}`
              : `${selected ? "Remove" : "Add"} ${source.name} ${selected ? "from" : "to"} compute`}
            checked={Boolean(computeName) || selected}
            className="mt-0.5 shrink-0 data-[state=checked]:text-[#FFFFFF]"
            disabled={Boolean(computeName) || deleting || clearing || Boolean(metaError)}
            onCheckedChange={() => onToggleSelection(source.id)}
          />
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="min-w-0 break-words text-sm font-semibold">{source.name}</h3>
            <Badge
              className={computeName
                ? "max-w-full truncate border-[#1E90FF] bg-transparent text-[#1E90FF]"
                : selected ? "border-primary bg-transparent text-primary" : undefined}
              title={computeName ? `Attached to ${computeName}` : undefined}
              variant="outline"
            >
              {computeName ?? (selected ? "Pending" : "Not attached")}
            </Badge>
            {meta && (
              <Badge
                className={meta.total > 0
                  ? "border-[#008000] bg-transparent text-[#008000]"
                  : "border-border bg-transparent text-muted-foreground"}
                variant="outline"
              >
                {meta.total > 0 ? "Data Available" : "Empty"}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex max-w-[70%] shrink-0 flex-nowrap items-center justify-end gap-2 overflow-x-auto">
          <SourceInfoDialog buttonClassName="shrink-0" compute={compute} snapshot={snapshot} />
          <SourceDetailDialog buttonClassName="shrink-0" snapshot={snapshot} />
          <Button
            className="shrink-0"
            disabled={refreshing || deleting || clearing}
            onClick={() => void refresh()}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={refreshing ? "animate-spin" : undefined} /> Refresh
          </Button>
          <ComputeAttachmentTooltip computeName={computeName}>
            <Button
              className="shrink-0"
              disabled={Boolean(computeName) || refreshing || deleting || clearing}
              onClick={() => setConfirmClear(true)}
              size="sm"
              variant="outline"
            >
              <Eraser /> Reset Source
            </Button>
          </ComputeAttachmentTooltip>
          <ComputeAttachmentTooltip computeName={computeName}>
            <Button
              className="shrink-0"
              disabled={Boolean(computeName) || refreshing || deleting || clearing}
              onClick={() => setConfirmDelete(true)}
              size="sm"
              variant="destructive"
            >
              <Trash2 /> Delete
            </Button>
          </ComputeAttachmentTooltip>
        </div>
      </div>
      <SourceMetadata computeName={computeName} snapshot={snapshot} />
      {metaError && (
        <p className="text-sm text-destructive" role="alert">{metaError}</p>
      )}
      {actionError && (
        <p className="text-sm text-destructive" role="alert">{actionError}</p>
      )}
      <ConfirmDialog
        busy={clearing}
        error={clearError}
        itemName={source.name}
        labels={{
          title: "Reset Source",
          description: "Remove all data from “{{name}}” while keeping its metadata?",
          cancel: "Cancel",
          pending: "Resetting…",
          confirm: "Reset Source",
        }}
        onClose={() => {
          setConfirmClear(false);
          setClearError(undefined);
        }}
        onConfirm={() => void clear()}
        open={confirmClear}
        tone="warn"
      />
      <ConfirmDialog
        busy={deleting}
        error={deleteError}
        itemName={source.name}
        labels={{
          title: "Delete Source",
          description: "Delete the store and all observations in “{{name}}”?",
          cancel: "Cancel",
          deleting: "Deleting…",
          confirmDelete: "Delete Source",
        }}
        onClose={() => {
          setConfirmDelete(false);
          setDeleteError(undefined);
        }}
        onConfirm={() => void remove()}
        open={confirmDelete}
      />
    </Card>
  );
}

function ComputeAttachmentTooltip({
  computeName,
  children,
}: {
  computeName?: string;
  children: ReactNode;
}) {
  if (!computeName) return children;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex shrink-0" tabIndex={0}>{children}</span>
      </TooltipTrigger>
      <TooltipContent>
        This source is attached to {computeName}. Remove it from the compute before resetting or deleting it.
      </TooltipContent>
    </Tooltip>
  );
}

function SourceInfoDialog({
  snapshot,
  compute,
  buttonClassName = "w-full",
}: {
  snapshot: DataSourceSummary;
  compute?: Compute;
  buttonClassName?: string;
}) {
  const { source, meta } = snapshot;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonClassName} size="sm" variant="outline">
          <Info /> Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Info className="size-4" /> Info</DialogTitle>
          <DialogDescription className="sr-only">
            Details for {source.name}.
          </DialogDescription>
        </DialogHeader>
        <dl className="space-y-3">
          <div><dt className="text-muted-foreground">Source</dt><dd>{meta?.collection ?? source.service.collectionName}</dd></div>
          <div><dt className="text-muted-foreground">Source ID</dt><dd className="break-all font-mono text-xs">{source.id}</dd></div>
          <div><dt className="text-muted-foreground">Provider</dt><dd>{source.service.providerLabel}</dd></div>
          <div><dt className="text-muted-foreground">Total</dt><dd>{meta?.total ?? "Unavailable"}</dd></div>
          <div><dt className="text-muted-foreground">Created</dt><dd>{meta ? new Date(meta.createdAt).toLocaleString() : "Unavailable"}</dd></div>
          {compute && meta && meta.total > 0 && (
            <div>
              <dt className="text-muted-foreground">Mapped period</dt>
              <dd>{compute.periodModel.name} · {compute.periodModel.unit === "year" ? "Years" : "Days"}</dd>
              <dd className="mt-2 flex max-h-24 flex-wrap gap-1 overflow-y-auto">
                {compute.periodModel.values.map((value) => <Badge key={value} variant="secondary">{value}</Badge>)}
              </dd>
            </div>
          )}
        </dl>
      </DialogContent>
    </Dialog>
  );
}

function SourceDetailDialog({
  snapshot,
  buttonClassName = "w-full",
}: {
  snapshot: DataSourceSummary;
  buttonClassName?: string;
}) {
  const { source } = snapshot;
  const [open, setOpen] = useState(false);
  const [elements, setElements] = useState<DataSourceElement[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!open) return;
    let active = true;
    setElements(undefined);
    setError(undefined);
    setLoading(true);
    void sourceService.listObservations(source.id)
      .then((result) => {
        if (active) setElements(result);
      })
      .catch((reason) => {
        if (active) setError(reason instanceof Error ? reason.message : "Unable to load content.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [open, source.id]);

  return (
    <Dialog
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setElements(undefined);
          setError(undefined);
        }
        setOpen(nextOpen);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className={buttonClassName} size="sm" variant="outline">
          <Database /> Show Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{source.name}</DialogTitle>
          <DialogDescription>
            {elements
              ? `${elements.length} ${elements.length === 1 ? "item" : "items"} stored in this collection.`
              : "Items stored in this collection."}
          </DialogDescription>
        </DialogHeader>
        {loading && <p className="text-sm text-muted-foreground" role="status">Loading content…</p>}
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        {elements && (
          <div className="max-h-96 overflow-y-auto">
            {elements.length === 0 && <EmptyList />}
            {elements.map((element) => (
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-4 border-t border-border py-3" key={element.id}>
                <p className="min-w-0 break-all font-mono text-xs">{element.id}</p>
                <pre className="min-w-0 whitespace-pre-wrap break-words font-mono text-xs">{JSON.stringify(element.body, null, 2)}</pre>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
