import { getServiceApiUrl } from "./service-location";
import { dataSourceRequest, dataSourceRequestBlob } from "./data-source.request";
import type { Compute, ComputeSnapshot, CreateCompute } from "./data-source.types";
import { sourceService } from "./source.service";

export type ServerModel = Readonly<{
  meta: Readonly<{
    report: 'server-model';
    modelVersion: number;
    serverId: string;
    serverName: string;
    description: string;
    createdAt: string;
    generatedAt: string;
    instanceCount: number;
    totalFootprintBytes: number;
    period: Compute['periodModel'];
    comparison: Compute['comparisonModel'];
  }>;
  data: ReadonlyArray<Readonly<{
    sourceId: string;
    name: string;
    provider: string;
    description: string;
    elementCount: number | null;
    footprintBytes: number;
    values: ReadonlyArray<Readonly<{ period: string; value: number }>>;
  }>>;
}>;

class ComputeService {
  async getSourceNumericDataSizeBytes(sourceId: string): Promise<number> {
    const elements = await sourceService.listObservations(sourceId);
    return elements.reduce((total, { body }) => {
      if (!Number.isFinite(body.value)) return total;
      return total + String(body.value).length;
    }, 0);
  }

  listComputes(): Promise<Compute[]> {
    return dataSourceRequest<Compute[]>(`${getServiceApiUrl("dataSources")}/computes`);
  }

  async isComputeNameAvailable(name: string): Promise<boolean> {
    const query = new URLSearchParams({ name });
    const result = await dataSourceRequest<{ available: boolean }>(
      `${getServiceApiUrl("dataSources")}/computes/name-availability?${query}`,
    );
    return result.available;
  }

  createCompute(input: CreateCompute): Promise<ComputeSnapshot> {
    return dataSourceRequest<ComputeSnapshot>(`${getServiceApiUrl("dataSources")}/computes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }

  validateSources(sourceIds: string[]): Promise<{ registered: boolean; missingIds: string[] }> {
    return dataSourceRequest<{ registered: boolean; missingIds: string[] }>(`${getServiceApiUrl("dataSources")}/computes/validate-sources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceIds }),
    });
  }

  refreshCompute(computeId: string): Promise<ComputeSnapshot> {
    return dataSourceRequest<ComputeSnapshot>(
      `${getServiceApiUrl("dataSources")}/computes/${encodeURIComponent(computeId)}/refresh`,
      { method: "POST" },
    );
  }

  getServerModel(computeId: string): Promise<ServerModel> {
    return dataSourceRequest<ServerModel>(
      `${getServiceApiUrl('dataSources')}/computes/${encodeURIComponent(computeId)}/model`,
    );
  }

  downloadServerModel(computeId: string): Promise<Blob> {
    return dataSourceRequestBlob(
      `${getServiceApiUrl('dataSources')}/computes/${encodeURIComponent(computeId)}/model/bump`,
    );
  }

  deleteCompute(computeId: string): Promise<{ deleted: true }> {
    return dataSourceRequest<{ deleted: true }>(
      `${getServiceApiUrl("dataSources")}/computes/${encodeURIComponent(computeId)}`,
      { method: "DELETE" },
    );
  }

  deleteAllComputes(): Promise<{ deleted: number }> {
    return dataSourceRequest<{ deleted: number }>(
      `${getServiceApiUrl("dataSources")}/computes`,
      { method: "DELETE" },
    );
  }
}

export const computeService = new ComputeService();
