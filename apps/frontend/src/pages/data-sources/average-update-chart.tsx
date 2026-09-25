import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { Button, EmptyList } from "@cui/ui/components";
import type { Benchmark } from "../../services/benchmark.types";

const colors = ["var(--primary)", "#008000", "#1E90FF", "#FF8C00", "#8B008B", "#B22222", "#008B8B"];
const width = 800;
const height = 260;
const left = 48;
const right = 16;
const top = 16;
const bottom = 32;
const plotWidth = width - left - right;
const plotHeight = height - top - bottom;

export function AverageUpdateChart({ benchmark }: { benchmark: Benchmark }) {
  const [detailedScale, setDetailedScale] = useState(true);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const successful = benchmark.samples
    .filter((sample) => sample.status !== "failed")
    .sort((first, second) => Date.parse(first.observedAt) - Date.parse(second.observedAt));
  if (!successful.length) {
    return <section className="space-y-3 rounded-lg border p-4"><h3 className="text-sm font-semibold">Average update comparison</h3><EmptyList description="No successful queries were recorded." /></section>;
  }
  const average = successful.reduce((sum, sample) => sum + sample.updateTimeMs, 0) / successful.length;
  const firstTime = Date.parse(successful[0].observedAt);
  const lastTime = Date.parse(successful[successful.length - 1].observedAt);
  const minimum = Math.max(1, successful.reduce((value, sample) => Math.min(value, sample.updateTimeMs), average) * 0.7);
  const maximum = Math.max(minimum * 1.001, successful.reduce((value, sample) => Math.max(value, sample.updateTimeMs), average) * 1.05);
  const ratio = maximum / minimum;
  const x = (time: number) => left + (firstTime === lastTime ? 0.5 : (time - firstTime) / (lastTime - firstTime)) * plotWidth;
  const y = (value: number) => top + plotHeight - (detailedScale
    ? Math.log(Math.max(value, minimum) / minimum) / Math.log(ratio)
    : value / maximum) * plotHeight;
  const tick = (fraction: number) => detailedScale ? minimum * ratio ** fraction : maximum * fraction;
  const series = benchmark.instances.map((instance, index) => ({
    ...instance,
    color: colors[index % colors.length],
    values: successful.filter((sample) => sample.sourceId === instance.sourceId),
  }));

  return (
    <section aria-label="Average update comparison" className="space-y-3 rounded-lg border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">Average update comparison</h3>
          <p className="text-xs text-muted-foreground">Each instance is a colored line. The gray line is the overall mean of successful queries.</p>
        </div>
        <Button onClick={() => setDetailedScale((current) => !current)} size="sm" variant="outline">
          <ZoomIn aria-hidden="true" /> {detailedScale ? "Linear scale" : "Zoom details"}
        </Button>
      </div>
      <svg
        aria-label="Instance update times compared with the overall average"
        className="h-auto w-full touch-pan-y"
        onPointerLeave={() => setHoverTime(null)}
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const position = (event.clientX - bounds.left) / bounds.width * width;
          const bounded = Math.min(width - right, Math.max(left, position));
          setHoverTime(firstTime + (bounded - left) / plotWidth * Math.max(lastTime - firstTime, 1));
        }}
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
          <g key={fraction}>
            <line className="stroke-border" x1={left} x2={width - right} y1={y(tick(fraction))} y2={y(tick(fraction))} />
            <text className="fill-muted-foreground text-[10px]" textAnchor="end" x={left - 7} y={y(tick(fraction)) + 3}>{Math.round(tick(fraction))}</text>
          </g>
        ))}
        <line stroke="#808080" strokeDasharray="6 4" strokeWidth="2" x1={left} x2={width - right} y1={y(average)} y2={y(average)} />
        {series.map(({ sourceId, color, values }) => (
          <g key={sourceId}>
            {values.length > 1 && <polyline fill="none" points={values.map((value) => `${x(Date.parse(value.observedAt))},${y(value.updateTimeMs)}`).join(" ")} stroke={color} strokeLinejoin="round" strokeWidth="2" />}
            {values.length === 1 && <circle cx={x(Date.parse(values[0].observedAt))} cy={y(values[0].updateTimeMs)} fill={color} r="3" />}
          </g>
        ))}
        {hoverTime !== null && <line stroke="#808080" strokeDasharray="3 4" x1={x(hoverTime)} x2={x(hoverTime)} y1={top} y2={height - bottom} />}
        <text className="fill-muted-foreground text-[10px]" x={left} y={height - 6}>{new Date(firstTime).toLocaleTimeString()}</text>
        <text className="fill-muted-foreground text-[10px]" textAnchor="end" x={width - right} y={height - 6}>{new Date(lastTime).toLocaleTimeString()}</text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
        {series.map(({ sourceId, name, color, values }) => {
          const nearest = hoverTime === null ? undefined : values.reduce<(typeof values)[number] | undefined>((best, value) =>
            !best || Math.abs(Date.parse(value.observedAt) - hoverTime) < Math.abs(Date.parse(best.observedAt) - hoverTime) ? value : best, undefined);
          return <span className="inline-flex items-center gap-2" key={sourceId}><span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: color }} />{name}{nearest && <strong>{nearest.updateTimeMs} ms</strong>}</span>;
        })}
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="w-4 border-t-2 border-dashed" style={{ borderColor: "#808080" }} />Overall average <strong>{average.toFixed(1)} ms</strong></span>
      </div>
    </section>
  );
}
