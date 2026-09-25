import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { ComputeComparison } from "@/lib/types";
import { insightsService } from "@/services/insights.service";
import {
  Button, Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger, EmptyList, Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@cui/ui/components";

export function CreateInsightDialog({
  onCreate,
}: {
  onCreate: (comparison: ComputeComparison) => void;
}) {
  const [open, setOpen] = useState(false);
  const [comparisonId, setComparisonId] = useState('');
  const [comparisons, setComparisons] = useState<ComputeComparison[]>([]);
  const [loadingComparisons, setLoadingComparisons] = useState(false);
  const [comparisonsError, setComparisonsError] = useState(false);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setComparisons([]);
    setLoadingComparisons(true);
    setComparisonsError(false);
    void insightsService.listAvailableComparisons()
      .then((available) => { if (active) setComparisons(available); })
      .catch(() => { if (active) setComparisonsError(true); })
      .finally(() => { if (active) setLoadingComparisons(false); });
    return () => { active = false; };
  }, [open]);

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen);
    setComparisonId('');
  }

  function createInsight() {
    const comparison = comparisons.find(({ id, provider }) => `${provider}:${id}` === comparisonId);
    if (!comparison) return;
    onCreate(comparison);
    changeOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild><Button><Plus />Create Insight</Button></DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Insight</DialogTitle>
          <DialogDescription>Select a saved comparison to display its correlation insights.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {loadingComparisons ? (
            <p className="text-sm text-muted-foreground" role="status">Loading comparisons…</p>
          ) : comparisonsError ? (
            <p className="text-sm text-destructive" role="alert">Unable to load comparisons.</p>
          ) : comparisons.length === 0 ? <EmptyList /> : (
            <Select value={comparisonId} onValueChange={setComparisonId}>
              <SelectTrigger className="w-full" aria-label="Comparison">
                <SelectValue placeholder="Select a comparison" />
              </SelectTrigger>
              <SelectContent>
                {comparisons.map((comparison) => (
                  <SelectItem key={`${comparison.provider}:${comparison.id}`} value={`${comparison.provider}:${comparison.id}`}>
                    {comparison.name} · {comparison.provider === 'bump' ? 'Bump file' : 'MongoDB Atlas'} · {new Date(comparison.createdAt).toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <div className="flex justify-end">
            <Button disabled={!comparisonId || loadingComparisons} onClick={createInsight}>Create Insight</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
