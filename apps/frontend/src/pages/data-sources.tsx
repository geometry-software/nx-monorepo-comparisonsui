import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { Benchmark } from "../services/benchmark.types";
import { benchmarkService } from '../services/benchmark.service';
import {
  Alert, AlertDescription, Button, Card, CardContent, Notification, Tabs, TabsContent,
} from "@cui/ui/components";
import type { NotificationPayload } from "@cui/ui/components";
import { SourcesActions, SourcesTab } from "./data-sources/sources-tab";
import { PeriodsActions, PeriodsTab } from "./data-sources/periods-tab";
import { ComputeActions, ComputeTab } from "./data-sources/compute-tab";
import { DataSourceTabBar } from "./data-sources/data-source-tab-bar";
import { useDataSourceWorkspace } from "./data-sources/use-data-source-workspace";

export function DataSources() {
  const [notice, setNotice] = useState<NotificationPayload | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);
  const [benchmarks, setBenchmarks] = useState<Record<string, Benchmark | null>>({});
  const benchmarksRef = useRef(benchmarks);
  benchmarksRef.current = benchmarks;
  const [selectedComputeIds, setSelectedComputeIds] = useState<string[]>([]);
  const [trackedComputeIds, setTrackedComputeIds] = useState<string[]>(() => {
    try {
      const stored: unknown = JSON.parse(window.sessionStorage.getItem('trackedBenchmarkServers') ?? '[]');
      return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      window.sessionStorage.setItem('trackedBenchmarkServers', JSON.stringify(trackedComputeIds));
    } catch {
      // Benchmark tracking continues in memory when browser storage is unavailable.
    }
  }, [trackedComputeIds]);
  const {
    snapshots, selectedSourceIds, setSelectedSourceIds, computes, periods,
    activeTab, setActiveTab, loadingSources, loadError, retry, refresh,
    refreshSource, refreshCompute, updateSource, removeSource, verifyAccountSession,
    createCompute, onSourceCreated, onPeriodCreated,
  } = useDataSourceWorkspace();

  useEffect(() => {
    if (activeTab !== 'compute' || computes.length === 0) return;
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    const monitor = async () => {
      const results = await Promise.allSettled(computes.map(async ({ id }) => {
        const status = await benchmarkService.getStatus(id);
        const known = benchmarksRef.current[id];
        if (!status) return { id, status: null, benchmark: null };
        if (known?.runId === status.runId && known.status === status.status) {
          return { id, status: status.status, benchmark: undefined };
        }
        return { id, status: status.status, benchmark: await benchmarkService.get(id) };
      }));
      if (!active) return;
      const updates = results.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);
      setBenchmarks((current) => {
        const next = { ...current };
        let changed = false;
        for (const { id, benchmark } of updates) {
          if (benchmark !== undefined && current[id] !== benchmark) {
            next[id] = benchmark;
            changed = true;
          }
        }
        return changed ? next : current;
      });
      const recordingIds = updates.filter(({ status }) => status === 'recording').map(({ id }) => id);
      if (recordingIds.length) {
        setTrackedComputeIds((current) => {
          const next = [...new Set([...current, ...recordingIds])];
          return next.length === current.length ? current : next;
        });
      }
      timer = setTimeout(() => void monitor(), 5_000);
    };
    void monitor();
    return () => { active = false; clearTimeout(timer); };
  }, [activeTab, computes]);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Data Source</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Configure virtual data sources and inspect each source collection.
        </p>
      </header>

      {notice && <Notification className="fixed right-4 top-4 z-50 w-[min(40rem,calc(100vw-2rem))] shadow-md" onClose={() => setNotice(null)} payload={notice} />}

      {loadingSources && (
        <Card aria-busy="true" role="status">
          <CardContent className="flex items-center justify-center gap-3 py-8 text-sm text-muted-foreground">
            <LoaderCircle className="size-5 animate-spin" /> Loading data sources…
          </CardContent>
        </Card>
      )}
      {loadError && !loadingSources && (
        <Alert variant="destructive">
          <AlertDescription className="flex flex-wrap items-center justify-between gap-3">
            <span>{loadError}</span>
            <Button onClick={retry} size="sm" variant="outline">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {!loadingSources && !loadError && <Tabs onValueChange={setActiveTab} value={activeTab}>
        <DataSourceTabBar actions={activeTab === "sources" ? (
          <SourcesActions
            snapshots={snapshots}
            computes={computes}
            periods={periods}
            selectedSourceIds={selectedSourceIds}
            onNotification={setNotice}
            onSelectionChange={setSelectedSourceIds}
            onCreated={async (sourceId) => {
              await onSourceCreated(sourceId);
              setNotice({ type: 'success', message: 'Data source created.' });
            }}
            onRefreshAll={refresh}
            onSave={createCompute}
            onComputeCreated={() => {
              setActiveTab("compute");
              setNotice({ type: 'success', message: 'Compute created.' });
            }}
            onVerifyAccountSession={verifyAccountSession}
          />
        ) : activeTab === "period" ? (
          <PeriodsActions onCreated={(period) => {
            onPeriodCreated(period);
            setNotice({ type: 'success', message: `Period ${period.name} created.` });
          }} periods={periods} />
        ) : (
          <ComputeActions
            computes={computes}
            benchmarks={benchmarks}
            selectedComputeIds={selectedComputeIds}
            trackedComputeIds={trackedComputeIds}
            deletingAll={deletingAll}
            onDeletingAllChange={setDeletingAll}
            onRefresh={refresh}
            onTrackStarted={(started) => {
              setBenchmarks((current) => Object.fromEntries([...Object.entries(current), ...started.map((benchmark) => [benchmark.computeId, benchmark]) ]));
              setTrackedComputeIds(started.map((benchmark) => benchmark.computeId));
            }}
            onTrackStopped={(stopped) => {
              setBenchmarks((current) => Object.fromEntries([...Object.entries(current), ...stopped.map((benchmark) => [benchmark.computeId, benchmark]) ]));
            }}
            onNotification={setNotice}
          />
        )} />
        <TabsContent value="sources">
          <SourcesTab
            onSourceUpdated={updateSource}
            onSourceDeleted={removeSource}
            onSelectionChange={setSelectedSourceIds}
            selectedSourceIds={selectedSourceIds}
            snapshots={snapshots}
            computes={computes}
            onNotification={setNotice}
          />
        </TabsContent>
        <TabsContent value="period">
          <PeriodsTab periods={periods} />
        </TabsContent>
        <TabsContent forceMount style={activeTab === "compute" ? undefined : { display: "none" }} value="compute">
          <ComputeTab computes={computes} snapshots={snapshots} onRefresh={refresh} onComputeRefresh={refreshCompute} onSourceUpdated={refreshSource} deletingAll={deletingAll} benchmarks={benchmarks} active={activeTab === "compute"} selectedComputeIds={selectedComputeIds} onSelectionChange={setSelectedComputeIds} onNotification={setNotice} />
        </TabsContent>
      </Tabs>}
    </section>
  );
}
