import type { BenchmarkPdfReportModel } from '@cui/network/providers/pdf';
import type { Benchmark } from '../benchmark.models.js';

const timeWindows = 24;

export function createBenchmarkPdfModel(benchmark: Benchmark): BenchmarkPdfReportModel {
  const samples = [...benchmark.samples].sort((left, right) =>
    left.observedAt.getTime() - right.observedAt.getTime());
  const firstTime = samples[0]?.observedAt.getTime() ?? 0;
  const lastTime = samples.at(-1)?.observedAt.getTime() ?? firstTime;
  const timeSpan = Math.max(lastTime - firstTime, 1);
  const windowOf = (time: Date) => Math.min(timeWindows - 1,
    Math.floor((time.getTime() - firstTime) / timeSpan * timeWindows));

  const instances = benchmark.instances.map((instance) => {
    const queries = samples.filter((sample) => sample.sourceId === instance.sourceId);
    const measurements = queries.filter((sample) => sample.status !== 'failed');
    const average = measurements.length
      ? measurements.reduce((sum, sample) => sum + sample.updateTimeMs, 0) / measurements.length
      : null;
    const deviations = average === null ? [] : measurements.map((sample) =>
      Math.abs(sample.updateTimeMs - average));
    return {
      sourceId: instance.sourceId,
      name: instance.name,
      provider: instance.provider ?? 'unknown',
      samples: measurements.map((sample) => ({
        observedAt: sample.observedAt.getTime(),
        updateTimeMs: sample.updateTimeMs,
        footprintBytes: sample.footprintBytes,
      })),
      queryCount: queries.length,
      failedQueryCount: queries.length - measurements.length,
      footprintBytes: measurements.at(-1)?.footprintBytes ?? null,
      averageUpdateTimeMs: average,
      meanDeviationMs: deviations.length
        ? deviations.reduce((sum, deviation) => sum + deviation, 0) / deviations.length : null,
      peakDeviationMs: deviations.length
        ? deviations.reduce((peak, deviation) => Math.max(peak, deviation), 0) : null,
    };
  });

  const providerNames = [...new Set(instances.map((instance) => instance.provider))];
  const providers = providerNames.map((provider) => {
    const members = instances.filter((instance) => instance.provider === provider);
    const values = Array.from({ length: timeWindows }, (_, window) => {
      const instanceAverages = members.flatMap((instance) => {
        const inWindow = instance.samples.filter((sample) =>
          Math.min(timeWindows - 1, Math.floor((sample.observedAt - firstTime) / timeSpan * timeWindows)) === window);
        return inWindow.length
          ? [inWindow.reduce((sum, sample) => sum + sample.updateTimeMs, 0) / inWindow.length]
          : [];
      });
      return instanceAverages.length
        ? instanceAverages.reduce((sum, value) => sum + value, 0) / instanceAverages.length
        : null;
    });
    return { provider, instanceCount: members.length, values };
  });
  const successful = samples.filter((sample) => sample.status !== 'failed');

  return {
    serverName: benchmark.computeName,
    startedAt: benchmark.startedAt,
    stoppedAt: benchmark.stoppedAt ?? new Date(),
    generatedAt: new Date(),
    firstObservedAt: firstTime,
    lastObservedAt: lastTime,
    intervalSeconds: benchmark.intervalSeconds,
    instances,
    providers,
    failedQueriesByWindow: Array.from({ length: timeWindows }, (_, window) =>
      samples.filter((sample) => sample.status === 'failed' && windowOf(sample.observedAt) === window).length),
    averageUpdateTimeMs: successful.length
      ? successful.reduce((sum, sample) => sum + sample.updateTimeMs, 0) / successful.length
      : null,
  };
}
