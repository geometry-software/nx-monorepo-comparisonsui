import type { DataContainer } from '@cui/network/providers';
import type { ComputeComparison } from '../lib/types';
import { trackRequestActivity } from './request-activity';
import { getServiceApiUrl } from './service-location';

class InsightsService {
  listAvailableComparisons(): Promise<ComputeComparison[]> {
    return trackRequestActivity('GET', async () => {
      const response = await fetch(getServiceApiUrl('comparisons', 'computes'));
      const payload = (await response.json().catch(() => undefined)) as
        | DataContainer<ComputeComparison[]>
        | { message?: string }
        | undefined;
      if (!response.ok) {
        const message = payload && 'message' in payload ? payload.message : undefined;
        throw new Error(message || 'Unable to load comparisons.');
      }
      if (!payload || !('data' in payload) || !Array.isArray(payload.data)) {
        throw new Error('The comparisons response is invalid.');
      }
      return payload.data;
    });
  }

  exportPdf(comparison: Pick<ComputeComparison, 'id' | 'provider' | 'createdAt'>): Promise<Blob> {
    return trackRequestActivity('POST', async () => {
      const response = await fetch(getServiceApiUrl('comparisons', 'insights'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comparison),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => undefined)) as { message?: string } | undefined;
        throw new Error(payload?.message || 'Unable to export the correlation insight PDF.');
      }
      return response.blob();
    });
  }
}

export const insightsService = new InsightsService();
