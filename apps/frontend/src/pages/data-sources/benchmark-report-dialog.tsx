import { useState, type PointerEvent } from "react";
import { Download, FileDown, FileUp, ZoomIn } from "lucide-react";
import {
  Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, EmptyList,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsList, TabsTrigger,
} from "@cui/ui/components";
import type { Benchmark, BenchmarkReport } from "../../services/benchmark.types";
import { benchmarkService } from "../../services/benchmark.service";
import { ProviderBenchmarkChart } from "./provider-benchmark-chart";
import { AverageUpdateChart } from './average-update-chart';
import { benchmarkFileSystemService } from '../../services/benchmark-file-system.service';
import { downloadReportFile } from './download-report-file';

const lineColors = [
  "var(--primary)", "#008000", "#1E90FF", "#FF8C00", "#8B008B", "#B22222", "#008B8B",
];
const chartWidth = 800;
const chartHeight = 280;
const chartLeft = 48;
const chartRight = 16;
const chartTop = 16;
const chartBottom = 32;
const plotWidth = chartWidth - chartLeft - chartRight;
const plotHeight = chartHeight - chartTop - chartBottom;

export function BenchmarkReportDialog({
  benchmark: serverBenchmark,
  benchmarks,
  importedFile,
  onImportRequest,
  open,
  onOpenChange,
}: {
  benchmark: Benchmark | null;
  benchmarks?: BenchmarkReport['servers'];
  importedFile?: File;
  onImportRequest: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [detailedScale, setDetailedScale] = useState(true);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [savingBump, setSavingBump] = useState(false);
  const [bumpError, setBumpError] = useState<string>();
  const [exportingPdf, setExportingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string>();
  const [activeComputeId, setActiveComputeId] = useState<string>();
  const reports = benchmarks?.length ? benchmarks : serverBenchmark ? [serverBenchmark] : [];
  const benchmark = reports.find(({ computeId }) => computeId === activeComputeId) ?? reports[0];
  if (!benchmark) return null;
  const queries = [...benchmark.samples].sort(
    (left, right) => Date.parse(left.observedAt) - Date.parse(right.observedAt),
  );
  const samples = queries.filter((query) => query.status !== "failed");
  const failedQueries = queries.filter((query) => query.status === "failed");
  const firstTime = samples.length ? Date.parse(samples[0].observedAt) : 0;
  const lastTime = samples.length ? Date.parse(samples[samples.length - 1].observedAt) : 0;
  const timeSpan = Math.max(lastTime - firstTime, 1);
  const maxDuration = samples.reduce((peak, { updateTimeMs }) => Math.max(peak, updateTimeMs), 1);
  const minDuration = samples.reduce((minimum, { updateTimeMs }) => Math.min(minimum, updateTimeMs), Infinity);
  const detailMinimum = Math.max(1, Number.isFinite(minDuration) ? minDuration * 0.7 : 1);
  const chartMaximum = Math.max(2, maxDuration * 1.05);
  const detailRatio = Math.max(1.001, chartMaximum / detailMinimum);
  const x = (time: string) => firstTime === lastTime
    ? (chartLeft + chartWidth - chartRight) / 2
    : chartLeft + (Date.parse(time) - firstTime) / timeSpan * plotWidth;
  const yFraction = (duration: number) => detailedScale
    ? Math.log(Math.max(duration, detailMinimum) / detailMinimum) / Math.log(detailRatio)
    : duration / chartMaximum;
  const y = (duration: number) => chartHeight - chartBottom - yFraction(duration) * plotHeight;
  const tickValue = (fraction: number) => detailedScale
    ? detailMinimum * detailRatio ** fraction
    : chartMaximum * fraction;
  const statistics = benchmark.instances.map((instance, index) => {
    const values = samples.filter(({ sourceId }) => sourceId === instance.sourceId);
    const queriesForInstance = queries.filter(({ sourceId }) => sourceId === instance.sourceId);
    const average = values.length
      ? values.reduce((total, { updateTimeMs }) => total + updateTimeMs, 0) / values.length
      : 0;
    const meanDeviation = values.length
      ? values.reduce((total, { updateTimeMs }) => total + Math.abs(updateTimeMs - average), 0) / values.length
      : 0;
    const peakDeviation = values.reduce(
      (peak, { updateTimeMs }) => Math.max(peak, Math.abs(updateTimeMs - average)), 0,
    );
    return {
      ...instance,
      color: lineColors[index % lineColors.length],
      values,
      queryCount: queriesForInstance.length,
      failedCount: queriesForInstance.length - values.length,
      average,
      meanDeviation,
      peakDeviation,
      footprintBytes: values.at(-1)?.footprintBytes,
    };
  });
  const hoveredValues = hoverTime === null ? [] : statistics.map(({ sourceId, name, color, values }) => {
    const nearest = values.reduce<(typeof values)[number] | undefined>((best, value) =>
      !best || Math.abs(Date.parse(value.observedAt) - hoverTime) < Math.abs(Date.parse(best.observedAt) - hoverTime)
        ? value : best, undefined);
    return { sourceId, name, color, nearest };
  });
  const hoverX = hoverTime === null ? null : firstTime === lastTime
    ? x(samples[0].observedAt)
    : chartLeft + (hoverTime - firstTime) / timeSpan * plotWidth;
  const averageUpdateTime = samples.length
    ? samples.reduce((total, sample) => total + sample.updateTimeMs, 0) / samples.length
    : null;
  const peakUpdateTime = samples.reduce((peak, sample) => Math.max(peak, sample.updateTimeMs), 0);
  const totalFootprint = statistics.reduce((total, instance) => total + (instance.footprintBytes ?? 0), 0);
  const mostVariable = statistics
    .filter((instance) => instance.values.length > 0)
    .reduce<(typeof statistics)[number] | null>((current, instance) =>
      !current || instance.meanDeviation > current.meanDeviation ? instance : current, null);

  function inspectChart(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width * chartWidth;
    const boundedX = Math.min(chartWidth - chartRight, Math.max(chartLeft, position));
    setHoverTime(firstTime + (boundedX - chartLeft) / plotWidth * timeSpan);
  }

  async function saveBumpFile() {
    setSavingBump(true);
    setBumpError(undefined);
    try {
      const content = importedFile ?? await benchmarkService.downloadBatchBumpReport(
        reports.map(({ computeId, runId }) => ({ computeId, runId })),
      );
      downloadReportFile(content, reports.length > 1 ? `benchmark-${reports.length}-servers.bump.ts` : `${benchmark.computeName}-benchmark.bump.ts`);
    } catch (error) {
      setBumpError(error instanceof Error ? error.message : "Unable to download the Bump file.");
    } finally {
      setSavingBump(false);
    }
  }

  async function exportPdf() {
    setExportingPdf(true);
    setPdfError(undefined);
    try {
      const file = importedFile
        ? await benchmarkFileSystemService.exportPdf(importedFile)
        : await benchmarkService.exportBatchPdfReport(reports.map(({ computeId, runId }) => ({ computeId, runId })));
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = reports.length > 1 ? `benchmark-${reports.length}-servers.pdf` : `${benchmark.computeName}-benchmark-report.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      setPdfError(error instanceof Error ? error.message : "Unable to export the PDF report.");
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span aria-label={importedFile ? 'Imported file' : 'Server report'} className="size-2.5 rounded-full" role="img" style={{ backgroundColor: importedFile ? '#1E90FF' : '#008000' }} />
            Benchmark Report · {reports.length > 1 ? `${reports.length} servers` : benchmark.computeName}
          </DialogTitle>
          <DialogDescription>
            {new Date(benchmark.startedAt).toLocaleString()} – {benchmark.stoppedAt
              ? new Date(benchmark.stoppedAt).toLocaleString()
              : "Recording"} · {queries.length} connection queries · {benchmark.intervalSeconds === 0
                ? "continuous checks" : `${benchmark.intervalSeconds} s between checks`}
          </DialogDescription>
        </DialogHeader>
        <Tabs onValueChange={(computeId) => { setActiveComputeId(computeId); setHoverTime(null); }} value={benchmark.computeId}>
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {reports.map(({ computeId, computeName }) => <TabsTrigger className="rounded-lg border px-3 py-2 data-active:border-primary data-active:text-primary" key={computeId} value={computeId}>{computeName}</TabsTrigger>)}
          </TabsList>
        </Tabs>
        {samples.length === 0 ? <EmptyList description="No successful connection measurements were recorded." /> : (
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">Update time by instance</h3>
                <p className="text-xs text-muted-foreground">All instances share one chart. Hover to inspect exact values.</p>
              </div>
              <Button onClick={() => setDetailedScale((current) => !current)} size="sm" variant="outline">
                <ZoomIn aria-hidden="true" /> {detailedScale ? "Linear scale" : "Zoom details"}
              </Button>
            </div>
            <svg
              aria-label={`Connection update time by instance over the recording period, ${detailedScale ? "detailed logarithmic" : "linear"} scale`}
              className="h-auto w-full touch-pan-y"
              onPointerLeave={() => setHoverTime(null)}
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
              {hoverX !== null && (
                <line stroke="var(--muted-foreground)" strokeDasharray="4 4" strokeWidth="1" x1={hoverX} x2={hoverX} y1={chartTop} y2={chartHeight - chartBottom} />
              )}
              {statistics.map(({ sourceId, color, values }) => (
                <g key={sourceId}>
                  {values.length > 1 && (
                    <polyline
                      fill="none"
                      points={values.map(({ observedAt, updateTimeMs }) => `${x(observedAt)},${y(updateTimeMs)}`).join(" ")}
                      stroke={color}
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  )}
                </g>
              ))}
              {hoveredValues.map(({ sourceId, color, nearest }) => nearest && (
                <circle cx={x(nearest.observedAt)} cy={y(nearest.updateTimeMs)} fill={color} key={sourceId} r="4" stroke="var(--background)" strokeWidth="1.5" />
              ))}
              <text className="fill-muted-foreground text-[10px]" x={chartLeft} y={chartHeight - 6}>
                {new Date(firstTime).toLocaleTimeString()}
              </text>
              <text className="fill-muted-foreground text-[10px]" textAnchor="end" x={chartWidth - chartRight} y={chartHeight - 6}>
                {new Date(lastTime).toLocaleTimeString()}
              </text>
            </svg>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {statistics.map(({ sourceId, name, color }) => {
                const nearest = hoveredValues.find((value) => value.sourceId === sourceId)?.nearest;
                return (
                  <span className="flex items-center gap-2 text-xs" key={sourceId}>
                    <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
                    {name}
                    {nearest && <strong>{nearest.updateTimeMs} ms</strong>}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {hoverTime === null
                ? "Detailed scale expands smaller update times without splitting the instances into separate charts."
                : `Nearest measurements to ${new Date(hoverTime).toLocaleTimeString()}.`}
            </p>
          </div>
        )}
        <AverageUpdateChart benchmark={benchmark} />
        <ProviderBenchmarkChart benchmark={benchmark} />
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instance</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Queries</TableHead>
                <TableHead className="text-right">Query Lost</TableHead>
                <TableHead className="text-right">Footprint</TableHead>
                <TableHead className="text-right">Average</TableHead>
                <TableHead className="text-right">Mean deviation</TableHead>
                <TableHead className="text-right">Peak deviation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.map(({ sourceId, name, provider, color, values, queryCount, failedCount, footprintBytes, average, meanDeviation, peakDeviation }) => (
                <TableRow key={sourceId}>
                  <TableCell className="font-medium">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                      {name}
                    </span>
                  </TableCell>
                  <TableCell>{provider === "mongodb" ? "MongoDB Atlas" : provider === "firebase" ? "Firebase Store" : provider === "memory" ? "In-memory Collection" : "Unknown"}</TableCell>
                  <TableCell className="text-right">{queryCount}</TableCell>
                  <TableCell className="text-right">{queryCount ? `${(failedCount / queryCount * 100).toFixed(1)}%` : "—"}</TableCell>
                  <TableCell className="text-right">{footprintBytes === undefined ? "—" : `${footprintBytes} B`}</TableCell>
                  <TableCell className="text-right">{values.length ? `${average.toFixed(1)} ms` : "—"}</TableCell>
                  <TableCell className="text-right">{values.length ? `${meanDeviation.toFixed(1)} ms` : "—"}</TableCell>
                  <TableCell className="text-right">{values.length ? `${peakDeviation.toFixed(1)} ms` : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground">Query Lost is the percentage of recorded connection checks that failed. Deviation is measured against each instance’s average successful update time.</p>
        <section className="space-y-3 rounded-lg border p-4" aria-label="Benchmark summary">
          <div>
            <h3 className="text-sm font-semibold">Benchmark Summary</h3>
            <p className="text-xs text-muted-foreground">Total Queries sums recorded connection checks across all instances. Counts can differ because instances check independently.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Total Queries</p>
              <p className="text-lg font-semibold">{queries.length}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Failed queries</p>
              <p className="text-lg font-semibold">{failedQueries.length}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Average update</p>
              <p className="text-lg font-semibold">{averageUpdateTime === null ? "—" : `${averageUpdateTime.toFixed(1)} ms`}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Peak update</p>
              <p className="text-lg font-semibold">{samples.length ? `${peakUpdateTime.toFixed(1)} ms` : "—"}</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">Total footprint</p>
              <p className="text-lg font-semibold">{totalFootprint} B</p>
            </div>
          </div>
          {mostVariable && (
            <p className="text-xs text-muted-foreground">
              Most variable instance: <span className="font-medium text-foreground">{mostVariable.name}</span>
              {` · ${mostVariable.meanDeviation.toFixed(1)} ms mean deviation`}
            </p>
          )}
        </section>
        {bumpError && <p className="text-sm text-destructive" role="alert">{bumpError}</p>}
        {pdfError && <p className="text-sm text-destructive" role="alert">{pdfError}</p>}
        <DialogFooter>
          <Button onClick={onImportRequest} type="button" variant="outline"><FileUp aria-hidden="true" /> Import File</Button>
          <Button disabled={savingBump} onClick={saveBumpFile} type="button" variant="outline">
            <Download aria-hidden="true" /> Download Bump File
          </Button>
          <Button disabled={exportingPdf} onClick={exportPdf} type="button" variant="outline">
            <FileDown aria-hidden="true" /> Export PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
