import { ServiceUnavailableException } from '@nestjs/common';

export async function fetchDataSource<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new ServiceUnavailableException(
      `Data source service is unavailable: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
  if (!response.ok) {
    throw new ServiceUnavailableException(`Data source service returned ${response.status}.`);
  }
  return response.json() as Promise<T>;
}
