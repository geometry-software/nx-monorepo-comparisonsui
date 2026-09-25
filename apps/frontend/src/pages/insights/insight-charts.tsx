import { Info } from "lucide-react";
import type { ComputeComparison } from "@/lib/types";
import {
  Badge, Card, CardContent, CardDescription, CardHeader, CardTitle,
  CorrelationMatrixChart, EmptyList, StrongestAlignedPairChart,
} from "@cui/ui/components";

export function InsightCharts({ comparison }: { comparison: ComputeComparison }) {
  const data = comparison.pearsonCorrelations;
  if (data.length === 0) return <EmptyList />;
  const entities = [...new Set(data.flatMap((item) => [item.sourceA, item.sourceB]))];
  const orderedPairs = [...data].sort((left, right) => {
    if (left.r === null) return right.r === null ? 0 : 1;
    if (right.r === null) return -1;
    return Math.abs(right.r) - Math.abs(left.r);
  });
  const matrix = Object.fromEntries([...data].reverse().map((item) => [`${item.sourceA}--${item.sourceB}`, item.r]));
  const elementsCompared = data.reduce((total, item) => total + item.observationCount, 0);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info />General Info</CardTitle>
              <CardDescription>Metadata for the selected comparison.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Label</dt>
                  <dd className="mt-2 break-words text-2xl font-bold">{comparison.name}</dd>
                </div>
                <div className="min-w-0 border-l border-border pl-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</dt>
                  <dd className="mt-2 break-words text-xs font-bold">{comparison.description?.trim() || 'No description provided.'}</dd>
                </div>
              </dl>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div className="min-w-0">
                  <WidgetHeading label="Source Pairs" description="Source combinations analyzed in this comparison." />
                  <p className="mt-2 break-words text-2xl font-bold">{data.length}</p>
                </div>
                <div className="min-w-0 border-l border-border pl-4">
                  <WidgetHeading label="Elements Compared" description="Matched period values across all source pairs." />
                  <p className="mt-2 break-words text-2xl font-bold">{elementsCompared}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <WidgetHeading label="Strongest Relationship" description="Source pairs ordered by absolute Pearson R, strongest first." />
                <ol className="mt-3 space-y-3">
                  {orderedPairs.map((pair, index) => (
                    <li className="flex items-center justify-between gap-3 text-sm" key={`${pair.sourceA}-${pair.sourceB}-${index}`}>
                      <span className="flex min-w-0 flex-wrap gap-1.5">
                        <Badge className="h-auto max-w-full shrink py-1 text-left whitespace-normal break-all">{pair.sourceA}</Badge>
                        <Badge className="h-auto max-w-full shrink py-1 text-left whitespace-normal break-all" variant="secondary">{pair.sourceB}</Badge>
                      </span>
                      <span className="shrink-0 text-right font-mono">{pair.r?.toFixed(4) ?? '—'}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        <div className="min-w-0"><CorrelationMatrixChart entities={entities} values={matrix} /></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {data.map((pair, index) => (
          <StrongestAlignedPairChart
            key={`${pair.sourceA}-${pair.sourceB}-${index}`}
            data={{
              title: `${pair.sourceA} and ${pair.sourceB}`,
              periods: pair.periods,
              series: [
                { label: pair.sourceA, values: normalize(pair.sourceAValues), color: '#228B22' },
                { label: pair.sourceB, values: normalize(pair.sourceBValues), color: 'var(--primary)' },
              ],
            }}
          />
        ))}
      </div>
    </div>
  );
}

function normalize(values: number[]) {
  if (!values.length) return values;
  const min = Math.min(...values); const max = Math.max(...values); const range = max - min || 1;
  return values.map((value) => (value - min) / range);
}
function WidgetHeading({ label, description }: { label: string; description: string }) {
  return <div className="space-y-0.5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><p className="text-xs leading-snug text-muted-foreground">{description}</p></div>;
}
