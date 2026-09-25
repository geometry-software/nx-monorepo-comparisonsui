import { getServiceApiUrl } from "./service-location";
import { dataSourceRequest } from "./data-source.request";
import type { CreatePeriod, Period } from "./data-source.types";

class PeriodService {
  listPeriods(): Promise<Period[]> {
    return dataSourceRequest<Period[]>(`${getServiceApiUrl("dataSources")}/periods`);
  }

  async isPeriodNameAvailable(name: string): Promise<boolean> {
    const query = new URLSearchParams({ name });
    const result = await dataSourceRequest<{ available: boolean }>(
      `${getServiceApiUrl("dataSources")}/periods/name-availability?${query}`,
    );
    return result.available;
  }

  createPeriod(input: CreatePeriod): Promise<Period> {
    return dataSourceRequest<Period>(`${getServiceApiUrl("dataSources")}/periods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  }
}

export const periodService = new PeriodService();
