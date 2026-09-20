export type ApiServiceName =
  | 'years'
  | 'tgi'
  | 'comparisons';

export type ApiServiceKind = 'data-source' | 'orchestrator';

export type ApiNetwork = Readonly<{
  protocol: 'inherit' | 'http' | 'https';
  hostname: 'current' | string;
  port: number;
  basePath: `/${string}`;
  path?: `/${string}`;
}>;

export type ApiEndpointMetadata = Readonly<{
  service: ApiServiceName;
  label: string;
  kind: ApiServiceKind;
  version: string;
  resource?: string;
}>;

export type ApiEndpoint = Readonly<{
  network: ApiNetwork;
  metadata: ApiEndpointMetadata;
}>;

export type ServiceEndpointMap = Readonly<Record<ApiServiceName, ApiEndpoint>>;

export type ApiResponseContainer<Data> = Readonly<{
  endpoint: ApiEndpoint;
  data: Data;
}>;

export function createApiResponseContainer<Data>(
  endpoint: ApiEndpoint,
  data: Data,
): ApiResponseContainer<Data> {
  return { endpoint, data };
}
