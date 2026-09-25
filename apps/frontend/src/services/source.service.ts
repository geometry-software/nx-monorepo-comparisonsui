import { getServiceApiUrl } from "./service-location";
import { dataSourceRequest } from "./data-source.request";
import type {
  CreateDataSource,
  DataSource,
  DataSourceElement,
  DataSourceElementBody,
  DataSourceSummary,
  DataSourceProvider,
} from "./data-source.types";

export const dataSourceProviderOptions = [
  { value: "memory", label: "In-memory Collection", description: "In-memory Collection with period-value observations." },
  { value: "mongodb", label: "MongoDB Atlas", description: "MongoDB Atlas with period-value observations." },
  { value: "firebase", label: "Firebase Store", description: "Firebase Store with period-value observations." },
] as const satisfies ReadonlyArray<{
  value: DataSourceProvider;
  label: string;
  description: string;
}>;

class SourceService {
  createSource(input: CreateDataSource): Promise<DataSource> {
    return dataSourceRequest<DataSource>(getServiceApiUrl("dataSources"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }

  createFieldValues(sourceId: string, computeId: string, values: DataSourceElementBody[], overwrite = false): Promise<DataSourceElement[]> {
    return dataSourceRequest<DataSourceElement[]>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}/field-values`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ computeId, values, overwrite }),
      },
    );
  }

  listSources(): Promise<DataSourceSummary[]> {
    return dataSourceRequest<DataSourceSummary[]>(getServiceApiUrl("dataSources"));
  }

  repairRegistration(source: DataSourceSummary): Promise<{
    previousId: string;
    sourceId: string;
    action: "already-registered" | "remapped" | "recreated";
    message: string;
  }> {
    return dataSourceRequest<{
      previousId: string;
      sourceId: string;
      action: "already-registered" | "remapped" | "recreated";
      message: string;
    }>(`${getServiceApiUrl("dataSources")}/repair-registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceId: source.source.id,
        name: source.source.name,
        provider: source.source.provider,
        description: source.meta?.description,
      }),
    });
  }

  getSource(sourceId: string): Promise<DataSourceSummary> {
    return dataSourceRequest<DataSourceSummary>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}`,
    );
  }

  refreshSource(sourceId: string): Promise<DataSourceSummary> {
    return dataSourceRequest<DataSourceSummary>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}/refresh`,
      { method: "POST" },
    );
  }

  listObservations(sourceId: string): Promise<DataSourceElement[]> {
    return dataSourceRequest<DataSourceElement[]>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}/content`,
    );
  }

  clearSourceData(sourceId: string): Promise<DataSourceSummary> {
    return dataSourceRequest<DataSourceSummary>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}/content`,
      { method: "DELETE" },
    );
  }

  updateSourceConnection(sourceId: string): Promise<{ updatedAt: string }> {
    return dataSourceRequest<{ updatedAt: string }>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}/connection`,
      { method: "PATCH" },
    );
  }

  getSourceConnection(sourceId: string): Promise<{ value: string }> {
    return dataSourceRequest<{ value: string }>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}/connection`,
    );
  }

  async checkSourceConnection(sourceId: string): Promise<{ updatedAt: string; durationMs: number }> {
    const startedAt = performance.now();
    await this.updateSourceConnection(sourceId);
    const { value: updated } = await this.getSourceConnection(sourceId);
    if (!updated || !Number.isFinite(Date.parse(updated))) {
      throw new Error("The source update timestamp could not be read from its collection.");
    }
    return {
      updatedAt: updated,
      durationMs: Math.max(1, Math.round(performance.now() - startedAt)),
    };
  }

  deleteSource(sourceId: string): Promise<{ deleted: true }> {
    return dataSourceRequest<{ deleted: true }>(
      `${getServiceApiUrl("dataSources")}/${encodeURIComponent(sourceId)}`,
      { method: "DELETE" },
    );
  }
}

export const sourceService = new SourceService();
