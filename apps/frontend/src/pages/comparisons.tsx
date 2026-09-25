import { Alert, AlertDescription } from "@cui/ui/components";
import {
  useGetComparisonDefinitionQuery,
  useGetComparisonModelQuery,
  useListComputeComparisonsQuery,
} from "@/services/comparisons.service";
import { AddComparisonDialog } from "./comparisons/add-comparison-dialog";
import { ComparisonModelDialog } from "./comparisons/comparison-model-dialog";
import { ComputeComparisonTable } from "./comparisons/comparison-results";

export function Comparisons() {
  const definitionQuery = useGetComparisonDefinitionQuery();
  const modelQuery = useGetComparisonModelQuery();
  const groupsQuery = useListComputeComparisonsQuery();
  const unavailable = definitionQuery.isError || modelQuery.isError || groupsQuery.isError;
  const ready = !unavailable &&
    definitionQuery.isSuccess && !definitionQuery.isFetching && definitionQuery.data !== undefined &&
    modelQuery.isSuccess && !modelQuery.isFetching && modelQuery.data !== undefined &&
    groupsQuery.isSuccess && !groupsQuery.isFetching && groupsQuery.data !== undefined;

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Comparisons</h1>
          <p className="mt-2 text-muted-foreground">
            Compare all source pairs in a compute by shared periods. Expand a compute to inspect their correlations. Results are saved through the selected provider.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ComparisonModelDialog model={modelQuery.data} disabled={!ready} />
          <AddComparisonDialog disabled={!ready} />
        </div>
      </header>
      {unavailable && <Alert variant="destructive"><AlertDescription className="space-y-1">
        {definitionQuery.isError && <p>Comparison table definition is unavailable.</p>}
        {modelQuery.isError && <p>Comparison model is unavailable.</p>}
        {groupsQuery.isError && <p>Compute comparisons are unavailable.</p>}
      </AlertDescription></Alert>}
      {unavailable ? null : !ready ? (
        <p className="text-sm text-muted-foreground" role="status">Loading comparisons…</p>
      ) : (
        <ComputeComparisonTable groups={groupsQuery.data ?? []} definition={definitionQuery.data} />
      )}
    </section>
  );
}
