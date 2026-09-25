import { useEffect, useState } from 'react';
import { Download, RefreshCw, ScanSearch } from 'lucide-react';
import {
  Badge, Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, EmptyList,
} from '@cui/ui/components';
import type { Compute } from '../../services/data-source.types';
import { computeService, type ServerModel } from '../../services/compute.service';
import { downloadReportFile } from './download-report-file';

const providerNames: Record<string, string> = {
  mongodb: 'MongoDB Atlas', firebase: 'Firebase Store', memory: 'In-memory Collection',
};

function describeModel(model: ServerModel): string {
  const periodCount = model.meta.period.values.length;
  const expected = new Set(model.meta.period.values);
  const empty = model.data.filter((source) => source.values.length === 0).length;
  const matched = model.data.filter((source) =>
    source.values.length === periodCount && source.values.every((value) => expected.has(value.period))).length;
  const unexpected = model.data.reduce((count, source) =>
    count + source.values.filter((value) => !expected.has(value.period)).length, 0);
  const providers = new Set(model.data.map((source) => source.provider)).size;
  const parts = [
    `The server has ${model.data.length} sources across ${providers} ${providers === 1 ? 'provider' : 'providers'} and ${periodCount} selected ${model.meta.period.unit === 'year' ? 'years' : 'days'}.`,
    `${matched} ${matched === 1 ? 'source contains' : 'sources contain'} every selected period ID.`,
  ];
  if (empty) parts.push(`${empty} ${empty === 1 ? 'source is' : 'sources are'} empty.`);
  if (unexpected) parts.push(`${unexpected} ${unexpected === 1 ? 'value uses' : 'values use'} a period outside this model.`);
  if (model.meta.totalFootprintBytes === 0) parts.push('No numeric value footprint is recorded.');
  parts.push('This check uses the values saved in the model file at its last update.');
  return parts.join(' ');
}

export function ServerModelDialog({ compute, open, onOpenChange }: {
  compute: Compute;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [model, setModel] = useState<ServerModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [downloading, setDownloading] = useState(false);
  const [analysis, setAnalysis] = useState<string>();
  const [showAllPeriods, setShowAllPeriods] = useState(false);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setModel(null);
    setAnalysis(undefined);
    setShowAllPeriods(false);
    setError(undefined);
    setLoading(true);
    void computeService.getServerModel(compute.id)
      .then((result) => { if (active) setModel(result); })
      .catch((failure) => { if (active) setError(failure instanceof Error ? failure.message : 'Unable to load the server model.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [compute.id, open]);

  async function download() {
    setDownloading(true);
    setError(undefined);
    try {
      downloadReportFile(await computeService.downloadServerModel(compute.id), `${compute.name}-model.bump.ts`);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Unable to download the server model.');
    } finally {
      setDownloading(false);
    }
  }

  const periodCount = model?.meta.period.values.length ?? 0;
  const collapsedPeriodCount = periodCount > 12 ? Math.ceil(periodCount / 2) : periodCount;
  const periodValues = model?.meta.period.values ?? [];
  const visiblePeriods = showAllPeriods ? periodValues : periodValues.slice(0, collapsedPeriodCount);
  const providerCounts = model ? [...new Set(model.data.map((source) => source.provider))].map((provider) => ({
    provider, count: model.data.filter((source) => source.provider === provider).length,
  })) : [];
  const totalElements = model?.data.reduce((sum, source) => sum + source.values.length, 0) ?? 0;
  const sharedPeriods = model ? model.data.flatMap((first, index) => model.data.slice(index + 1).map((second) => ({
    first: first.name,
    second: second.name,
    count: first.values.filter((value) => second.values.some((other) => other.period === value.period)).length,
  }))) : [];

  return <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle>Server Model · {compute.name}</DialogTitle>
        <DialogDescription>Saved Bump model, source composition, and period-value structure.</DialogDescription>
      </DialogHeader>
      {loading && <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status"><RefreshCw className="size-4 animate-spin" /> Loading model…</p>}
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      {model && <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Sources', String(model.data.length)],
            ['Selected periods', String(periodCount)],
            ['Stored elements', String(totalElements)],
            ['Total footprint', `${model.meta.totalFootprintBytes} B`],
          ].map(([label, value]) => <div className="rounded-lg border p-3" key={label}>
            <p className="text-xs text-muted-foreground">{label}</p><p className="text-lg font-semibold">{value}</p>
          </div>)}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <section className="space-y-3 rounded-lg border p-4">
            <div><h3 className="text-sm font-semibold">Comparison Model</h3><p className="text-xs text-muted-foreground">Structure shared by every source element.</p></div>
            <p className="text-sm"><span className="text-muted-foreground">Period:</span> {model.meta.period.name} · {model.meta.period.unit} · {periodCount} values</p>
            <p className="text-sm"><span className="text-muted-foreground">Fields:</span> period ({model.meta.comparison.fields.period}), value ({model.meta.comparison.fields.value})</p>
            <div className="max-h-28 overflow-y-auto">
              <div className="flex flex-wrap gap-1.5">
                {visiblePeriods.map((period) => <Badge key={period} variant="outline">{period}</Badge>)}
              </div>
            </div>
            {periodCount > collapsedPeriodCount && <Button
              className="h-auto p-0 text-xs"
              onClick={() => setShowAllPeriods((current) => !current)}
              size="sm"
              type="button"
              variant="link"
            >
              {showAllPeriods ? 'Show fewer periods' : `Show remaining ${periodCount - collapsedPeriodCount} periods`}
            </Button>}
          </section>
          <section className="space-y-3 rounded-lg border p-4">
            <div><h3 className="text-sm font-semibold">Providers</h3><p className="text-xs text-muted-foreground">Number of sources using each provider.</p></div>
            {providerCounts.map(({ provider, count }) => <div className="space-y-1" key={provider}>
              <div className="flex justify-between text-xs"><span>{providerNames[provider] ?? provider}</span><span>{count}</span></div>
              <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${count / model.data.length * 100}%` }} /></div>
            </div>)}
          </section>
        </div>
        <section className="space-y-3 rounded-lg border p-4">
          <div><h3 className="text-sm font-semibold">Sources and period counts</h3><p className="text-xs text-muted-foreground">Values were captured when this server model was last updated.</p></div>
          {model.data.length === 0 ? <EmptyList /> : <div className="space-y-2">
            {model.data.map((source) => <div className="grid gap-2 rounded-md border p-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center" key={source.sourceId}>
              <div className="min-w-0"><p className="break-words font-medium">{source.name}</p><p className="text-xs text-muted-foreground">{providerNames[source.provider] ?? source.provider}</p></div>
              <span>{source.values.length} / {periodCount} elements</span>
              <span className="text-muted-foreground">{source.footprintBytes} B</span>
            </div>)}
          </div>}
        </section>
        <div className="grid gap-3 md:grid-cols-2">
          <section className="space-y-3 rounded-lg border p-4">
            <div><h3 className="text-sm font-semibold">Shared periods</h3><p className="text-xs text-muted-foreground">Period IDs present in both sources of each pair.</p></div>
            {sharedPeriods.length ? <div className="max-h-48 space-y-2 overflow-y-auto text-sm">
              {sharedPeriods.map((pair, index) => <div className="flex justify-between gap-3" key={index}>
                <span className="min-w-0 break-words">{pair.first} · {pair.second}</span><strong className="shrink-0">{pair.count}</strong>
              </div>)}
            </div> : <EmptyList description="Select at least two sources to compare periods." />}
          </section>
          <section className="space-y-3 rounded-lg border p-4">
            <div><h3 className="text-sm font-semibold">Value ranges</h3><p className="text-xs text-muted-foreground">Smallest and largest numeric value in each source.</p></div>
            {model.data.length === 0 ? <EmptyList /> : <div className="max-h-64 space-y-2 overflow-y-auto text-sm">
              {model.data.map((source) => {
                const minimum = source.values.reduce((value, item) => Math.min(value, item.value), Infinity);
                const maximum = source.values.reduce((value, item) => Math.max(value, item.value), -Infinity);
                return <article className="space-y-2 rounded-md border p-3" key={source.sourceId}>
                  <h4 className="break-words font-semibold">{source.name}</h4>
                  <p><span className="text-muted-foreground">Min Value:</span> <span className="font-medium">{source.values.length ? minimum : '—'}</span></p>
                  <p><span className="text-muted-foreground">Max Value:</span> <span className="font-medium">{source.values.length ? maximum : '—'}</span></p>
                </article>;
              })}
            </div>}
          </section>
        </div>
        {analysis && <section className="rounded-lg border p-4" aria-label="Model check">
          <h3 className="mb-2 text-sm font-semibold">Model Check</h3><p className="text-sm text-muted-foreground">{analysis}</p>
        </section>}
      </div>}
      <DialogFooter>
        <Button disabled={!model} onClick={() => model && setAnalysis(describeModel(model))} type="button" variant="outline"><ScanSearch aria-hidden="true" /> Model Check</Button>
        <Button disabled={!model || downloading} onClick={() => void download()} type="button" variant="outline"><Download aria-hidden="true" /> Download Bump File</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
}
