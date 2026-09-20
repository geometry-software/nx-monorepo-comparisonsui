/// <reference types='vitest' />
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { ApiEndpoint, ApiServiceKind, ServiceEndpointMap } from '@nx-react-nestjs/backend';

function endpoint(
  service: keyof ServiceEndpointMap,
  label: string,
  kind: ApiServiceKind,
  port: number,
  route: `/${string}`,
): ApiEndpoint {
  return {
    network: {
      protocol: 'inherit', hostname: 'current', port, basePath: '/api', path: route,
    },
    metadata: { service, label, kind, version: 'v1' },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname, '../..'), '');
  const servicePorts = {
    years: endpoint('years', 'Year', 'data-source', Number(env.YEARS_PORT || 3010), '/observations'),
    tgi: endpoint('tgi', 'TGI', 'data-source', Number(env.TGI_PORT || 3012), '/observations'),
    comparisons: endpoint('comparisons', 'Comparison Orchestrator', 'orchestrator', Number(env.COMPARISONS_PORT || 3017), '/comparisons'),
  } satisfies ServiceEndpointMap;

  return ({
  root: import.meta.dirname,
  envDir: '../..',
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server: {
    port: 4201,
    host: 'localhost',
    strictPort: true,
  },
  preview: {
    port: 4301,
    host: 'localhost',
  },
  plugins: [react(), tailwindcss()],
  define: {
    __SERVICE_PORTS__: JSON.stringify(servicePorts),
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: 'frontend',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
  });
});
