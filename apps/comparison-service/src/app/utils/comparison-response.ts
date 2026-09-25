import {
  createApiResponseContainer,
  type ApiEndpoint,
  type ApiResponseContainer,
} from '@cui/network/providers/core';

function comparisonEndpoint(path: `/${string}`, resource: string): ApiEndpoint {
  return {
    network: {
      protocol: 'inherit',
      hostname: 'current',
      port: Number(process.env.COMPARISONS_PORT || 3017),
      basePath: '/api',
      path,
    },
    metadata: {
      service: 'comparisons',
      label: 'Comparison Orchestrator',
      kind: 'orchestrator',
      version: 'v1',
      resource,
    },
  };
}

export function comparisonResponse<Data>(
  path: `/${string}`,
  resource: string,
  data: Data,
): ApiResponseContainer<Data> {
  return createApiResponseContainer(comparisonEndpoint(path, resource), data);
}

export function comparisonResponseExample(
  path: `/${string}`,
  resource: string,
  data: unknown,
) {
  const endpoint = comparisonEndpoint(path, resource);
  return {
    endpoint: {
      ...endpoint,
      network: { ...endpoint.network, port: 3017 },
    },
    data,
  };
}
