import { useEffect, useState } from "react";
import type { Compute, ComputeSnapshot, DataSourceSummary, Period } from "../../services/data-source.types";
import { sourceService } from "../../services/source.service";
import { periodService } from "../../services/period.service";
import { computeService } from "../../services/compute.service";
import { DataSourceRequestError } from "../../services/data-source.request";
import { getSession } from "../../services/session";
import { COMPUTE_VERIFICATION_REQUIRED_MESSAGE } from "./constants";

export function useDataSourceWorkspace() {
  const [snapshots, setSnapshots] = useState<DataSourceSummary[]>([]);
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);
  const [computes, setComputes] = useState<Compute[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [activeTab, setActiveTab] = useState("sources");
  const [loadingSources, setLoadingSources] = useState(true);
  const [loadError, setLoadError] = useState<string>();
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoadingSources(true);
    setLoadError(undefined);
    void Promise.all([
      sourceService.listSources(),
      computeService.listComputes(),
      periodService.listPeriods(),
    ])
      .then(([nextSnapshots, nextComputes, nextPeriods]) => {
        if (active) {
          setSnapshots(nextSnapshots);
          setComputes(nextComputes);
          setPeriods(nextPeriods);
        }
      })
      .catch((error) => {
        if (active) setLoadError(error instanceof Error ? error.message : "Unable to load data sources.");
      })
      .finally(() => {
        if (active) setLoadingSources(false);
      });
    return () => { active = false; };
  }, [reloadKey]);

  async function refresh() {
    const [nextSnapshots, nextComputes] = await Promise.all([
      sourceService.listSources(),
      computeService.listComputes(),
    ]);
    setSnapshots(nextSnapshots);
    setComputes(nextComputes);
  }

  async function refreshSource(sourceId: string) {
    const updated = await sourceService.refreshSource(sourceId);
    updateSource(updated);
  }

  function updateSource(updated: DataSourceSummary) {
    setSnapshots((current) => current.map((snapshot) =>
      snapshot.source.id === updated.source.id ? updated : snapshot,
    ));
  }

  function updateComputeSnapshot({ compute, sources }: ComputeSnapshot) {
    const updatedById = new Map(sources.map((snapshot) => [snapshot.source.id, snapshot]));
    setSnapshots((current) => {
      const knownIds = new Set(current.map(({ source }) => source.id));
      return [
        ...current.map((snapshot) => updatedById.get(snapshot.source.id) ?? snapshot),
        ...sources.filter(({ source }) => !knownIds.has(source.id)),
      ];
    });
    setComputes((current) => current.map((item) => item.id === compute.id ? compute : item));
  }

  async function refreshCompute(computeId: string): Promise<"refreshed" | "missing"> {
    try {
      updateComputeSnapshot(await computeService.refreshCompute(computeId));
      return "refreshed";
    } catch (error) {
      if (error instanceof DataSourceRequestError && error.status === 404 &&
        error.message.startsWith("Compute was not found:")) {
        await refresh();
        return "missing";
      }
      throw error;
    }
  }

  function removeSource(sourceId: string) {
    setSnapshots((current) => current.filter(({ source }) => source.id !== sourceId));
    setSelectedSourceIds((current) => current.filter((id) => id !== sourceId));
    setComputes((current) => current.map((compute) => ({
      ...compute,
      sourceIds: compute.sourceIds.filter((id) => id !== sourceId),
    })));
  }

  async function verifyAccountSession(): Promise<number> {
    const session = getSession();
    if (!session?.active || !session.verified) {
      throw new Error(COMPUTE_VERIFICATION_REQUIRED_MESSAGE);
    }
    return session.sessionId;
  }

  async function createCompute(name: string, description: string, periodId: string, accountSessionId: number) {
    const result = await computeService.createCompute({
      name,
      description,
      sourceIds: [...selectedSourceIds],
      periodId,
      comparisonModelId: "period-value",
      accountSessionId,
    });
    updateComputeSnapshot(result);
    setComputes((current) => [result.compute, ...current]);
    setSelectedSourceIds([]);
  }

  async function onSourceCreated(sourceId: string) {
    await refresh();
    if (!computes.some((compute) => compute.sourceIds.includes(sourceId))) {
      setSelectedSourceIds((current) =>
        current.includes(sourceId) ? current : [...current, sourceId],
      );
    }
  }

  function onPeriodCreated(period: Period) {
    setPeriods((current) => [...current, period]);
  }

  return {
    snapshots,
    selectedSourceIds,
    setSelectedSourceIds,
    computes,
    periods,
    activeTab,
    setActiveTab,
    loadingSources,
    loadError,
    retry: () => setReloadKey((current) => current + 1),
    refresh,
    refreshSource,
    refreshCompute,
    updateSource,
    removeSource,
    verifyAccountSession,
    createCompute,
    onSourceCreated,
    onPeriodCreated,
  };
}
