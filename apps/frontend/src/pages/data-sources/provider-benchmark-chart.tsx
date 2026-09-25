import { useState, type PointerEvent } from "react";
import { ZoomIn } from "lucide-react";
import { Button, EmptyList } from "@cui/ui/components";
import type { Benchmark } from "../../services/benchmark.types";

const timeWindows = 24;
const chartWidth = 800;
const chartHeight = 240;
const chartLeft = 48;
const chartRight = 16;
const chartTop = 16;
const chartBottom = 32;
const plotWidth = chartWidth - chartLeft - chartRight;
const plotHeight = chartHeight - chartTop - chartBottom;

const providers = {
  mongodb: { label: "MongoDB Atlas", color: "var(--primary)" },
  firebase: { label: "Firebase Store", color: "#008000" },
  memory: { label: "In-memory Collection", color: "#FF8C00" },
  unknown: { label: "Unknown provider", color: "#808080" },
} as const;

type Provider = keyof typeof providers;
type Bucket = { sum: number; count: number };

export function ProviderBenchmarkChart({ benchmark }: { benchmark: Benchmark }) {
  const [detailedScale, setDetailedScale] = useState(true);
  const [hoverWindow, setHoverWindow] = useState<number | null>(null);
  const sourceProviders = new Map(benchmark.instances.map((instance) => [
    instance.sourceId, instance.provider ?? "unknown",
  ] as const));
  const sourceNames = new Map(benchmark.instances.map((instance) => [instance.sourceId, instance.name] as const));
  const providerInstances = new Map<Provider, number>();
  for (const instance of benchmark.instances) {
    const provider = instance.provider ?? "unknown";
    providerInstances.set(provider, (providerInstances.get(provider) ?? 0) + 1);
  }
  const firstTime = benchmark.samples.reduce(
    (earliest, sample) => Math.min(earliest, Date.parse(sample.observedAt)), Infinity,
  );
  const lastTime = benchmark.samples.reduce(
    (latest, sample) => Math.max(latest, Date.parse(sample.observedAt)), -Infinity,
  );
  const timeSpan = Math.max(lastTime - firstTime, 1);
  const providerBuckets = new Map<Provider, Map<number, Map<string, Bucket>>>();
  const failedWindows = Array.from({ length: timeWindows }, () => 0);
  const failedQueries = benchmark.samples.filter((sample) => sample.status === "failed");

  for (const sample of benchmark.samples) {
    const provider = sourceProviders.get(sample.sourceId) ?? "unknown";
    const window = Math.min(
      timeWindows - 1,
      Math.floor((Date.parse(sample.observedAt) - firstTime) / timeSpan * timeWindows),
    );
    if (sample.status === "failed") {
      failedWindows[window] += 1;
      continue;
    }
    let windows = providerBuckets.get(provider);
    if (!windows) {
      windows = new Map();
      providerBuckets.set(provider, windows);
    }
    let instances = windows.get(window);
    if (!instances) {
      instances = new Map();
      windows.set(window, instances);
    }
    const bucket = instances.get(sample.sourceId) ?? { sum: 0, count: 0 };
    bucket.sum += sample.updateTimeMs;
    bucket.count += 1;
    instances.set(sample.sourceId, bucket);
  }

  const series = [...providerInstances].map(([provider, instanceCount]) => {
    const windows = providerBuckets.get(provider);
    const values = Array.from({ length: timeWindows }, (_, index) => {
      const instances = windows?.get(index);
      if (!instances?.size) return null;
      const averages = [...instances.values()].map(({ sum, count }) => sum / count);
      return averages.reduce((total, average) => total + average, 0) / averages.length;
    });
    return { provider, instanceCount, values, ...providers[provider] };
  });
  const allValues = series.flatMap(({ values }) => values.filter((value): value is number => value !== null));
  const peakFailures = Math.max(1, ...failedWindows);
  const failedInHoveredWindow = hoverWindow === null ? [] : failedQueries.filter((query) =>
    Math.min(timeWindows - 1,
      Math.floor((Date.parse(query.observedAt) - firstTime) / timeSpan * timeWindows)) === hoverWindow);
  const minDuration = allValues.reduce((minimum, value) => Math.min(minimum, value), Infinity);
  const maxDuration = allValues.reduce((maximum, value) => Math.max(maximum, value), 1);
  const detailMinimum = Math.max(1, Number.isFinite(minDuration) ? minDuration * 0.7 : 1);
  const chartMaximum = Math.max(2, maxDuration * 1.05);
  const detailRatio = Math.max(1.001, chartMaximum / detailMinimum);
  const x = (index: number) => chartLeft + (index + 0.5) / timeWindows * plotWidth;
  const yFraction = (duration: number) => detailedScale
    ? Math.log(Math.max(duration, detailMinimum) / detailMinimum) / Math.log(detailRatio)
    : duration / chartMaximum;
  const y = (duration: number) => chartHeight - chartBottom - yFraction(duration) * plotHeight;
  const tickValue = (fraction: number) => detailedScale
    ? detailMinimum * detailRatio ** fraction
    : chartMaximum * fraction;

  function inspectChart(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width * chartWidth;
    setHoverWindow(Math.min(
      timeWindows - 1,
      Math.max(0, Math.floor((position - chartLeft) / plotWidth * timeWindows)),
    ));
  }

  return (
    <section className="space-y-3 rounded-lg border p-4" aria-label="Update time by provider">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold">Update time by provider</h3>
          <p className="text-xs text-muted-foreground">
            Lines show successful query times by provider. Red bars count failed connection queries across all instances.
          </p>
        </div>
        <Button onClick={() => setDetailedScale((current) => !current)} size="sm" variant="outline">
          <ZoomIn aria-hidden="true" /> {detailedScale ? "Linear scale" : "Zoom details"}
        </Button>
      </div>
      {benchmark.samples.length === 0 ? <EmptyList description="No connection queries were recorded." /> : (
        <>
          <svg
            aria-label="Average successful connection update time by provider and failed query count across 24 time windows"
            className="h-auto w-full touch-pan-y"
            onPointerLeave={() => setHoverWindow(null)}
            onPointerMove={inspectChart}
            role="img"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
              const position = y(tickValue(fraction));
              return (
                <g key={fraction}>
                  <line className="stroke-border" x1={chartLeft} x2={chartWidth - chartRight} y1={position} y2={position} />
                  <text className="fill-muted-foreground text-[10px]" textAnchor="end" x={chartLeft - 7} y={position + 3}>
                    {Math.round(tickValue(fraction))}
                  </text>
                </g>
              );
            })}
            {failedWindows.map((count, index) => count > 0 && (
              <rect
                fill="#B22222"
                key={`failed-${index}`}
                opacity="0.75"
                width={Math.max(3, plotWidth / timeWindows - 8)}
                x={x(index) - Math.max(3, plotWidth / timeWindows - 8) / 2}
                y={chartHeight - chartBottom - count / peakFailures * plotHeight * 0.35}
                height={count / peakFailures * plotHeight * 0.35}
              >
                <title>{count} failed {count === 1 ? "query" : "queries"} in window {index + 1}</title>
              </rect>
            ))}
            <text className="fill-muted-foreground text-[10px]" textAnchor="end" x={chartWidth - chartRight} y={chartTop + 7}>
              {peakFailures} failed
            </text>
            {hoverWindow !== null && (
              <line stroke="var(--muted-foreground)" strokeDasharray="4 4" x1={x(hoverWindow)} x2={x(hoverWindow)} y1={chartTop} y2={chartHeight - chartBottom} />
            )}
            {series.map(({ provider, color, values }) => {
              let connected = false;
              const path = values.map((value, index) => {
                if (value === null) {
                  connected = false;
                  return "";
                }
                const command = connected ? "L" : "M";
                connected = true;
                return `${command}${x(index)},${y(value)}`;
              }).join(" ");
              return (
                <g key={provider}>
                  <path d={path} fill="none" stroke={color} strokeLinejoin="round" strokeWidth="2" />
                  {values.map((value, index) => value === null ? null : (
                    <circle cx={x(index)} cy={y(value)} fill={color} key={index} r={hoverWindow === index ? 4 : 2.5} />
                  ))}
                </g>
              );
            })}
            <text className="fill-muted-foreground text-[10px]" x={chartLeft} y={chartHeight - 6}>
              {new Date(firstTime).toLocaleTimeString()}
            </text>
            <text className="fill-muted-foreground text-[10px]" textAnchor="end" x={chartWidth - chartRight} y={chartHeight - 6}>
              {new Date(lastTime).toLocaleTimeString()}
            </text>
          </svg>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {series.map(({ provider, label, color, instanceCount, values }) => (
              <span className="inline-flex items-center gap-2 text-xs" key={provider}>
                <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
                {label} · {instanceCount} {instanceCount === 1 ? "instance" : "instances"}
                {hoverWindow !== null && values[hoverWindow] !== null && (
                  <strong>{values[hoverWindow]?.toFixed(1)} ms</strong>
                )}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 text-xs">
              <span aria-hidden="true" className="size-2.5 rounded-sm" style={{ backgroundColor: "#B22222" }} />
              Failed queries · {failedQueries.length}
              {hoverWindow !== null && <strong>{failedWindows[hoverWindow]} in window</strong>}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {hoverWindow === null
              ? "Hover over a time window to inspect its provider averages."
              : `Window ${hoverWindow + 1} of ${timeWindows} · ${new Date(firstTime + (hoverWindow + 0.5) / timeWindows * timeSpan).toLocaleTimeString()} · ${failedWindows[hoverWindow]} failed ${failedWindows[hoverWindow] === 1 ? "query" : "queries"}${failedInHoveredWindow.length ? ` (${[...new Set(failedInHoveredWindow.map((query) => sourceNames.get(query.sourceId) ?? query.sourceId))].join(", ")})` : ""}`}
          </p>
        </>
      )}
    </section>
  );
}
