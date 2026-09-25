import { getServiceApiUrl } from "./service-location";
import { dataSourceRequest, dataSourceRequestBlob } from "./data-source.request";
import type { Benchmark, BenchmarkStatus, RecordBenchmarkSample } from "./benchmark.types";

class BenchmarkService {
  private url(computeId: string): string {
    return `${getServiceApiUrl("dataSources")}/computes/${encodeURIComponent(computeId)}/benchmark`;
  }

  get(computeId: string): Promise<Benchmark | null> {
    return dataSourceRequest<Benchmark | null>(this.url(computeId));
  }

  getStatus(computeId: string): Promise<BenchmarkStatus | null> {
    return dataSourceRequest<BenchmarkStatus | null>(`${this.url(computeId)}/status`);
  }

  downloadBumpReport(computeId: string): Promise<Blob> {
    return dataSourceRequestBlob(`${this.url(computeId)}/bump`);
  }

  start(computeId: string, intervalSeconds: number): Promise<Benchmark> {
    return dataSourceRequest<Benchmark>(`${this.url(computeId)}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intervalSeconds }),
    });
  }

  stop(computeId: string, runId: string): Promise<Benchmark> {
    return dataSourceRequest<Benchmark>(`${this.url(computeId)}/stop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId }),
    });
  }

  recordSample(computeId: string, input: RecordBenchmarkSample): Promise<{ recorded: true }> {
    return dataSourceRequest<{ recorded: true }>(`${this.url(computeId)}/samples`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }

  saveBumpReport(computeId: string, runId: string): Promise<{ file: string }> {
    return dataSourceRequest<{ file: string }>(`${this.url(computeId)}/bump`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId }),
    });
  }

  exportPdfReport(computeId: string, runId: string): Promise<Blob> {
    return dataSourceRequestBlob(`${this.url(computeId)}/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId }),
    });
  }

  downloadBatchBumpReport(runs: Array<{ computeId: string; runId: string }>): Promise<Blob> {
    return dataSourceRequestBlob(`${getServiceApiUrl('dataSources')}/benchmarks/report/bump`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ runs }),
    });
  }

  exportBatchPdfReport(runs: Array<{ computeId: string; runId: string }>): Promise<Blob> {
    return dataSourceRequestBlob(`${getServiceApiUrl('dataSources')}/benchmarks/report/pdf`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ runs }),
    });
  }
}

export const benchmarkService = new BenchmarkService();
