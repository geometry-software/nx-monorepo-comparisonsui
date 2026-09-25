import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { BumpModel, BumpProvider } from '@cui/network/providers/bump';
import type { Compute, DataSourceSummary } from '../data-source.models.js';

export const SERVER_MODEL_BUMP_PROVIDER = Symbol('SERVER_MODEL_BUMP_PROVIDER');

export type ServerModelMeta = {
  report: 'server-model';
  modelVersion: 1;
  serverId: string;
  serverName: string;
  description: string;
  createdAt: Date;
  generatedAt: Date;
  instanceCount: number;
  totalFootprintBytes: number;
  period: Compute['periodModel'];
  comparison: Compute['comparisonModel'];
};

export type ServerModelSource = {
  sourceId: string;
  name: string;
  provider: string;
  description: string;
  elementCount: number | null;
  footprintBytes: number;
  values: Array<{ period: string; value: number }>;
};

export type ServerModel = BumpModel<ServerModelMeta, ServerModelSource>;
export type ServerModelBumpProvider = BumpProvider<ServerModelMeta, ServerModelSource>;

@Injectable()
export class ServerModelService {
  constructor(@Inject(SERVER_MODEL_BUMP_PROVIDER) private readonly bumpProvider: ServerModelBumpProvider) {}

  async save(compute: Compute, instances: Array<{
    source: DataSourceSummary;
    footprintBytes: number;
    values: Array<{ period: string; value: number }>;
  }>): Promise<void> {
    await this.bumpProvider.create(compute.name, {
      meta: {
        report: 'server-model', modelVersion: 1, serverId: compute.id,
        serverName: compute.name, description: compute.description,
        createdAt: compute.createdAt, generatedAt: new Date(),
        instanceCount: instances.length, totalFootprintBytes: compute.numericDataSizeBytes,
        period: compute.periodModel, comparison: compute.comparisonModel,
      },
      data: instances.map(({ source, footprintBytes, values }) => ({
        sourceId: source.source.id,
        name: source.source.name,
        provider: source.source.provider,
        description: source.meta?.description ?? '',
        elementCount: source.meta?.total ?? null,
        footprintBytes,
        values,
      })),
    });
  }

  async get(compute: Compute): Promise<ServerModel> {
    try {
      const model = await this.bumpProvider.findOne(compute.name);
      if (model.meta.report !== 'server-model' || model.meta.serverId !== compute.id) {
        throw new NotFoundException('The current server model file was not found.');
      }
      return model;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new NotFoundException('The server model file was not found.');
      }
      throw error;
    }
  }

  async download(compute: Compute): Promise<Buffer> {
    await this.get(compute);
    return this.bumpProvider.read(compute.name);
  }
}
