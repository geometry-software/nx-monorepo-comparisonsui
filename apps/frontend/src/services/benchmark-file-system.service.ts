import { getServiceApiUrl } from './service-location';
import { dataSourceRequest, dataSourceRequestBlob } from './data-source.request';
import type { BenchmarkReport } from './benchmark.types';

function formData(file: File): FormData {
  const data = new FormData();
  data.append('file', file);
  return data;
}

export const benchmarkFileSystemService = {
  importReport(file: File): Promise<BenchmarkReport> {
    return dataSourceRequest(`${getServiceApiUrl('dataSources')}/benchmarks/import`, {
      method: 'POST', body: formData(file),
    });
  },
  exportPdf(file: File): Promise<Blob> {
    return dataSourceRequestBlob(`${getServiceApiUrl('dataSources')}/benchmarks/import/pdf`, {
      method: 'POST', body: formData(file),
    });
  },
};
