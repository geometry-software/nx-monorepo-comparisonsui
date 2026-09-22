import type { ApiEndpoint, ApiServiceName, ServiceEndpointMap } from '@cui/network/providers';

export type ServiceName = ApiServiceName;

declare const __SERVICE_PORTS__: ServiceEndpointMap;

export function getServiceEndpoint(service: ServiceName): ApiEndpoint {
  return __SERVICE_PORTS__[service];
}

export function getServiceOrigin(service: ServiceName): string {
  const endpoint = getServiceEndpoint(service);
  const origin = new URL(window.location.origin);
  if (endpoint.network.protocol !== 'inherit') origin.protocol = `${endpoint.network.protocol}:`;
  if (endpoint.network.hostname !== 'current') origin.hostname = endpoint.network.hostname;
  origin.port = String(endpoint.network.port);
  return origin.origin;
}

export function getServiceApiUrl(service: ServiceName, suffix = ''): string {
  const endpoint = getServiceEndpoint(service);
  const route = [endpoint.network.basePath, endpoint.network.path, suffix]
    .filter((part): part is string => Boolean(part))
    .map((part) => part.replace(/^\/+|\/+$/g, ''))
    .join('/');
  return new URL(`/${route}`, `${getServiceOrigin(service)}/`).toString();
}

export function getServiceUrl(service: ServiceName, path: string): string {
  return new URL(path, `${getServiceOrigin(service)}/`).toString();
}
