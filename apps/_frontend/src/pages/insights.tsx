import { Activity, BarChart3, Grid3X3, Sparkles } from 'lucide-react';
import { CorrelationBars, CorrelationMatrix, SeriesLineChart } from '@nx-react-nestjs/components/app/correlation-charts';
import { Badge } from '@nx-react-nestjs/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nx-react-nestjs/components/ui/card';
import { useListComparisonsQuery } from '@/services/api';

const entities = ['Year', 'TGI'];

export function Insights() {
  const { data = [] } = useListComparisonsQuery();
  const ranked = data.filter((item) => item.r !== null).sort((a, b) => Math.abs(b.r ?? 0) - Math.abs(a.r ?? 0));
  const strongest = ranked[0];
  const matrix = Object.fromEntries(data.map((item) => [item.pairKey, item.r]));
  const average = ranked.length ? ranked.reduce((sum, item) => sum + Math.abs(item.r ?? 0), 0) / ranked.length : 0;
  return (
    <section className="space-y-6">
      <header><Badge className="mb-3" variant="outline"><Sparkles /> Project Info · Insights</Badge><h1 className="text-4xl font-bold tracking-tight">Correlation insights</h1><p className="mt-2 max-w-3xl text-muted-foreground">Four views of the strongest findings across stored comparisons. Correlation describes association, not causation.</p></header>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Comparisons" value={`${data.length}/1`} />
        <Metric label="Strongest pair" value={strongest ? `${strongest.leftEntity}–${strongest.rightEntity}` : '—'} />
        <Metric label="Average |R|" value={average.toFixed(3)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard icon={<BarChart3 />} title="Strongest relationships" description="Pairs ranked by absolute Pearson correlation."><CorrelationBars data={ranked.slice(0, 6).map((item) => ({ label: `${item.leftEntity}–${item.rightEntity}`, value: item.r ?? 0 }))} /></ChartCard>
        <ChartCard icon={<Grid3X3 />} title="Correlation matrix" description="Green is positive; violet is negative."><CorrelationMatrix entities={entities} values={matrix} /></ChartCard>
        <ChartCard icon={<Activity />} title={strongest ? `${strongest.leftEntity} and ${strongest.rightEntity}` : 'Strongest aligned pair'} description="The two normalized shapes across shared years.">{strongest ? <SeriesLineChart years={strongest.years} series={[{ label: strongest.leftEntity, values: normalize(strongest.leftValues), color: '#10b981' }, { label: strongest.rightEntity, values: normalize(strongest.rightValues), color: '#8b5cf6' }]} /> : <Empty />}</ChartCard>
        <ChartCard icon={<BarChart3 />} title="Evidence coverage" description="Number of aligned observations behind each leading R value."><CorrelationBars data={ranked.slice(0, 6).map((item) => ({ label: `${item.leftEntity}–${item.rightEntity}`, value: item.observationCount }))} /></ChartCard>
      </div>
    </section>
  );
}

function normalize(values: number[]) {
  if (!values.length) return values;
  const min = Math.min(...values); const max = Math.max(...values); const range = max - min || 1;
  return values.map((value) => (value - min) / range);
}
function Empty() { return <div className="grid h-52 place-items-center text-muted-foreground">Calculate comparisons to populate this chart.</div>; }
function Metric({ label, value }: { label: string; value: string }) { return <Card><CardContent className="pt-1"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></CardContent></Card>; }
function ChartCard({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) { return <Card><CardHeader><CardTitle className="flex items-center gap-2">{icon}{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent>{children}</CardContent></Card>; }
