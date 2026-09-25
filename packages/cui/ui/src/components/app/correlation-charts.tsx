import { cn } from '../../lib/utils';

export type CorrelationDatum = {
  label: string;
  value: number;
  count?: number;
};

const tone = (value: number) =>
  value >= 0 ? 'bg-emerald-500' : 'bg-violet-500';

export function CorrelationBars({ data, layout = 'inline' }: { data: CorrelationDatum[]; layout?: 'inline' | 'stacked' }) {
  const max = Math.max(...data.map(({ value }) => Math.abs(value)), 1);
  return (
    <div className="space-y-3" role="img" aria-label="Correlation strength bar chart">
      {data.map((item) => (
        <div className={layout === 'stacked' ? 'min-w-0 space-y-1.5' : 'grid grid-cols-[88px_1fr_48px] items-center gap-3'} key={item.label}>
          <span className={layout === 'stacked' ? 'block min-w-0 break-words text-xs font-medium' : 'truncate text-xs font-medium'}>{item.label}</span>
          <div className={layout === 'stacked' ? 'flex items-center gap-3' : 'contents'}>
            <div className={layout === 'stacked' ? 'h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted' : 'h-2.5 overflow-hidden rounded-full bg-muted'}>
              <div
                className={cn('h-full rounded-full', tone(item.value))}
                style={{ width: `${Math.abs(item.value / max) * 100}%` }}
              />
            </div>
            <span className="w-12 shrink-0 text-right font-mono text-xs">{item.value.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SeriesLineChart({
  periods,
  series,
  height = 230,
}: {
  periods: string[];
  series: Array<{ label: string; values: number[]; color: string }>;
  height?: number;
}) {
  const width = 620;
  const padding = height < 120 ? 18 : 26;
  const allValues = series.flatMap(({ values }) => values);
  const min = Math.min(...allValues, 0);
  const max = Math.max(...allValues, 1);
  const range = max - min || 1;
  const points = (values: number[]) => values.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(values.length - 1, 1);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <div>
      <svg className="h-auto w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Aligned time series chart">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-border" />
        {series.map((item) => (
          <polyline key={item.label} points={points(item.values)} fill="none" stroke={item.color} strokeWidth="3" strokeLinejoin="round" />
        ))}
        <text x={padding} y={height - 6} className="fill-muted-foreground text-[10px]">{periods[0]}</text>
        <text x={width - padding} y={height - 6} textAnchor="end" className="fill-muted-foreground text-[10px]">{periods.at(-1)}</text>
      </svg>
      <div className="flex flex-wrap gap-4">
        {series.map((item) => <span className="flex items-center gap-2 text-xs" key={item.label}><i className="size-2 rounded-full" style={{ background: item.color }} />{item.label}</span>)}
      </div>
    </div>
  );
}

export function CorrelationMatrix({ entities, values }: { entities: string[]; values: Record<string, number | null> }) {
  return (
    <div className="overflow-x-auto">
      <div className="grid w-full gap-1" style={{ gridTemplateColumns: `56px repeat(${entities.length}, minmax(44px, 1fr))`, minWidth: `${56 + entities.length * 44}px`, maxWidth: `${56 + entities.length * 96}px` }}>
        <span />
        {entities.map((entity) => <span className="text-center text-[11px] font-semibold" key={entity}>{entity}</span>)}
        {entities.flatMap((row, rowIndex) => [
          <span className="flex items-center text-[11px] font-semibold" key={`${row}-label`}>{row}</span>,
          ...entities.map((column, columnIndex) => {
            const value = row === column ? 1 : values[`${row}--${column}`] ?? values[`${column}--${row}`] ?? null;
            const opacity = value === null ? 0.08 : 0.15 + Math.abs(value) * 0.75;
            return <span key={`${row}-${column}`} className="grid aspect-square place-items-center rounded-md text-[10px] font-medium" style={{ backgroundColor: value !== null && value < 0 ? `color-mix(in srgb, var(--primary) ${Math.round(opacity * 100)}%, transparent)` : `rgb(16 185 129 / ${opacity})` }}>{rowIndex === columnIndex ? '1' : value?.toFixed(2) ?? '—'}</span>;
          }),
        ])}
      </div>
    </div>
  );
}
