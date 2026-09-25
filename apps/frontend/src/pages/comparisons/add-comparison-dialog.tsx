import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Compute } from "@/services/data-source.types";
import { computeService } from "@/services/compute.service";
import { sourceService } from "@/services/source.service";
import { getSession } from "@/services/session";
import { useCreateComputeComparisonMutation } from "@/services/comparisons.service";
import {
  Alert, AlertDescription, Button, Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger, EmptyList, Input, Label, Select,
  SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@cui/ui/components";

export function AddComparisonDialog({ disabled = false }: { disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [computes, setComputes] = useState<Compute[]>([]);
  const [computeId, setComputeId] = useState('');
  const [provider, setProvider] = useState<'mongodb' | 'bump'>('mongodb');
  const [sources, setSources] = useState<{ sourceId: string; name: string }[]>([]);
  const [loadingSources, setLoadingSources] = useState(false);
  const [accountSessionId, setAccountSessionId] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [create, createState] = useCreateComputeComparisonMutation();

  useEffect(() => {
    if (!open || disabled) return;
    const session = getSession();
    setComputes([]);
    setComputeId('');
    setProvider('mongodb');
    setSources([]);
    setAccountSessionId(session?.active ? session.sessionId : undefined);
    setLoading(false);
    if (!session?.active) {
      setError('Open a data source to select computes.');
      return;
    }
    let active = true;
    setError(undefined);
    setLoading(true);
    void computeService.listComputes()
      .then((availableComputes) => {
        if (active) setComputes(availableComputes.filter((compute) => compute.accountSessionId === session.sessionId));
      })
      .catch((reason) => {
        if (active) setError(reason instanceof Error ? reason.message : 'Unable to load computes.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [open, disabled]);

  useEffect(() => {
    if (!open || !computeId) return;
    const compute = computes.find(({ id }) => id === computeId);
    if (!compute) return;
    let active = true;
    setSources([]);
    setLoadingSources(true);
    setError(undefined);
    void Promise.all(compute.sourceIds.map((sourceId) => sourceService.getSource(sourceId)))
      .then((summaries) => {
        if (active) setSources(summaries.map(({ source }) => ({ sourceId: source.id, name: source.name })));
      })
      .catch((reason) => {
        if (active) setError(reason instanceof Error ? reason.message : 'Unable to load sources.');
      })
      .finally(() => {
        if (active) setLoadingSources(false);
      });
    return () => { active = false; };
  }, [open, computeId, computes]);

  async function submit() {
    const compute = computes.find(({ id }) => id === computeId);
    if (!accountSessionId || !compute || sources.length !== compute.sourceIds.length || sources.some(({ name }) => !name.trim())) return;
    setError(undefined);
    try {
      await create({ computeId, accountSessionId, provider, sources: sources.map(({ sourceId, name }) => ({ sourceId, name: name.trim() })) }).unwrap();
      setOpen(false);
    } catch (reason) {
      const response = reason as { data?: { message?: string } };
      setError(response.data?.message ?? 'Unable to create comparison.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}><Plus />Add comparison</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add comparison</DialogTitle>
          <DialogDescription>Select a compute. Every pair of its sources will be aligned by shared periods and compared.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Provider</Label>
            <Select value={provider} onValueChange={(value) => setProvider(value as 'mongodb' | 'bump')}>
              <SelectTrigger className="w-full" aria-label="Provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mongodb">MongoDB Atlas</SelectItem>
                <SelectItem value="bump">Bump file</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select disabled={loading || !accountSessionId} value={computeId} onValueChange={(value) => {
            setSources([]);
            setComputeId(value);
          }}>
            <SelectTrigger className="w-full" aria-label="Compute">
              <SelectValue placeholder={loading ? 'Loading computes…' : 'Select a compute'} />
            </SelectTrigger>
            <SelectContent>
              {computes.map((compute) => (
                <SelectItem key={compute.id} value={compute.id} disabled={compute.sourceIds.length < 2}>
                  {compute.name} ({compute.sourceIds.length} sources)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {loadingSources ? (
            <p className="text-sm text-muted-foreground">Loading sources…</p>
          ) : sources.length > 0 ? (
            <div className="space-y-3 rounded-lg border border-border p-4">
              {sources.map((source, index) => (
                <div className="space-y-1.5" key={source.sourceId}>
                  <Label htmlFor={`comparison-source-${source.sourceId}`}>Source {String.fromCharCode(65 + index)}</Label>
                  <Input
                    id={`comparison-source-${source.sourceId}`}
                    onChange={(event) => setSources((current) => current.map((item) => item.sourceId === source.sourceId ? { ...item, name: event.target.value } : item))}
                    value={source.name}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyList description={computeId ? 'No sources found in this compute.' : 'Select a compute to create a comparison between its sources.'} />
          )}
          {!loading && computes.length > 0 && computes.every((compute) => compute.sourceIds.length < 2) && <p className="text-sm text-muted-foreground">A compute needs at least two sources to be compared.</p>}
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="flex justify-end">
            <Button disabled={!computeId || loadingSources || sources.length !== computes.find(({ id }) => id === computeId)?.sourceIds.length || sources.some(({ name }) => !name.trim()) || createState.isLoading} onClick={() => void submit()}>
              {createState.isLoading ? 'Comparing…' : 'Create comparison'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
