import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  getComputeNameValidationError,
  type CreateComputeDto,
  type CreateDataSourceDto,
  type CreateFieldValuesDto,
  type CreatePeriodDto,
  type RepairSourceRegistrationDto,
} from './data-source.dto.js';
import {
  PERIOD_VALUE_COMPARISON_MODEL,
  type Compute,
  type ComputeSnapshot,
  type DataSource,
  type DataSourceSummary,
  type Observation,
  type Period,
} from './data-source.models.js';
import { ComputeRepository, PeriodRepository, SourceRepository } from './repositories/index.js';
import { AccountSessionVerifierService } from './services/account-session-verifier.service.js';
import { BenchmarkService } from './services/benchmark.service.js';
import { ServerModelService, type ServerModel } from './services/server-model.service.js';

@Injectable()
export class DataSourceService {
  constructor(
    private readonly sourceRepository: SourceRepository,
    private readonly periodRepository: PeriodRepository,
    private readonly computeRepository: ComputeRepository,
    private readonly accountSessionVerifier: AccountSessionVerifierService,
    private readonly benchmarkService: BenchmarkService,
    private readonly serverModelService: ServerModelService,
  ) {}

  clearStaleMemorySources(): Promise<number> {
    return this.sourceRepository.deleteMemorySources();
  }

  createSource(input: CreateDataSourceDto): Promise<DataSource> {
    return this.sourceRepository.createSource(input);
  }

  listSources(): Promise<DataSourceSummary[]> {
    return this.sourceRepository.listSources();
  }

  repairSourceRegistration(input: RepairSourceRegistrationDto) {
    return this.sourceRepository.repairRegistration(input);
  }

  async validateComputeSources(sourceIds: string[]) {
    const missingIds = await this.sourceRepository.missingIds(sourceIds);
    return { registered: missingIds.length === 0, missingIds };
  }

  getSource(sourceId: string): Promise<DataSourceSummary> {
    return this.sourceRepository.getSource(sourceId);
  }

  refreshSource(sourceId: string): Promise<DataSourceSummary> {
    return this.sourceRepository.refreshSource(sourceId);
  }

  listObservations(sourceId: string): Promise<Observation[]> {
    return this.sourceRepository.listObservations(sourceId);
  }

  updateSourceConnection(sourceId: string): Promise<{ updatedAt: Date }> {
    return this.sourceRepository.updateSourceConnection(sourceId);
  }

  getSourceConnection(sourceId: string): Promise<{ value: Date }> {
    return this.sourceRepository.getSourceConnection(sourceId);
  }

  async clearSourceData(sourceId: string): Promise<DataSourceSummary> {
    const record = await this.sourceRepository.requireSource(sourceId);
    await this.ensureSourceIsNotAttached(sourceId);
    return this.sourceRepository.clearSourceData(record);
  }

  async deleteSource(sourceId: string): Promise<{ deleted: true }> {
    const record = await this.sourceRepository.requireSource(sourceId);
    await this.ensureSourceIsNotAttached(sourceId);
    return this.sourceRepository.deleteSource(record);
  }

  listPeriods(): Promise<Period[]> {
    return this.periodRepository.listPeriods();
  }

  isPeriodNameAvailable(name: string): Promise<boolean> {
    return this.periodRepository.isNameAvailable(name);
  }

  createPeriod(input: CreatePeriodDto): Promise<Period> {
    return this.periodRepository.createPeriod(input);
  }

  async createCompute(input: CreateComputeDto): Promise<ComputeSnapshot> {
    const accountSessionId = await this.accountSessionVerifier.verify(input.accountSessionId);
    const nameError = getComputeNameValidationError(input.name);
    if (nameError) throw new BadRequestException(nameError);
    const period = await this.periodRepository.findById(input.periodId);
    if (!period) throw new NotFoundException('Selected period was not found.');

    const sourceIds = [...new Set(input.sourceIds)];
    if (await this.sourceRepository.countByIds(sourceIds) !== sourceIds.length) {
      throw new ConflictException('A compute can contain only registered sources.');
    }
    const existingComputes = await this.computeRepository.findAll();
    if (sourceIds.some((sourceId) =>
      existingComputes.some((compute) => compute.sourceIds.includes(sourceId))
    )) {
      throw new ConflictException('A source can belong to only one compute.');
    }
    if (existingComputes.some(
      (compute) => compute.name.toLowerCase() === input.name.toLowerCase(),
    )) {
      throw new ConflictException('A compute with this name already exists.');
    }

    const compute: Omit<Compute, 'instanceCount' | 'numericDataSizeBytes' | 'lastUpdatedAt'> = {
      id: randomUUID(),
      name: input.name,
      description: input.description.trim(),
      sourceIds,
      periodModel: {
        id: period._id,
        name: period.name,
        unit: period.unit,
        values: [...period.values],
      },
      comparisonModel: {
        id: input.comparisonModelId,
        fields: { ...PERIOD_VALUE_COMPARISON_MODEL.fields },
      },
      accountSessionId,
      createdAt: new Date(),
    };
    return this.populateCompute(compute, 'create');
  }

  async refreshCompute(computeId: string): Promise<ComputeSnapshot> {
    const compute = await this.computeRepository.findById(computeId);
    if (!compute) throw new NotFoundException(`Compute was not found: ${computeId}`);
    return this.populateCompute(compute, 'refresh');
  }

  async getServerModel(computeId: string): Promise<ServerModel> {
    const compute = await this.computeRepository.findById(computeId);
    if (!compute) throw new NotFoundException(`Compute was not found: ${computeId}`);
    return this.serverModelService.get(compute);
  }

  async downloadServerModel(computeId: string): Promise<{ fileName: string; content: Buffer }> {
    const compute = await this.computeRepository.findById(computeId);
    if (!compute) throw new NotFoundException(`Compute was not found: ${computeId}`);
    return { fileName: `${compute.name}-model.bump.ts`, content: await this.serverModelService.download(compute) };
  }

  private async populateCompute(
    current: Omit<Compute, 'instanceCount' | 'numericDataSizeBytes' | 'lastUpdatedAt'>,
    mode: 'create' | 'refresh',
  ): Promise<ComputeSnapshot> {
    const instances = await Promise.all(
      current.sourceIds.map(async (sourceId) => {
        const source = await this.sourceRepository.refreshSource(sourceId);
        const elements = await this.sourceRepository.listObservations(sourceId);
        const numericDataSizeBytes = elements.reduce((total, { body }) =>
          total + (Number.isFinite(body.value) ? String(body.value).length : 0), 0);
        return { source, numericDataSizeBytes, values: elements.map(({ body }) => ({
          period: body.period, value: body.value,
        })) };
      }),
    );
    const sources = instances.map(({ source }) => source);
    const lastUpdatedAt = new Date();
    const compute: Compute = {
      ...current,
      instanceCount: instances.length,
      numericDataSizeBytes: instances.reduce((total, instance) =>
        total + instance.numericDataSizeBytes, 0),
      lastUpdatedAt,
    };
    if (mode === 'create') {
      await this.serverModelService.save(compute, instances.map(({ source, numericDataSizeBytes, values }) => ({
        source, footprintBytes: numericDataSizeBytes, values,
      })));
      await this.sourceRepository.markUpdated(compute.sourceIds, lastUpdatedAt);
      const created = await this.computeRepository.create(compute);
      return {
        compute: created,
        sources: sources.map(({ source, ...summary }) => ({
          ...summary,
          source: { ...source, updatedAt: lastUpdatedAt, updated: lastUpdatedAt },
        })),
      };
    }
    await this.serverModelService.save(compute, instances.map(({ source, numericDataSizeBytes, values }) => ({
      source, footprintBytes: numericDataSizeBytes, values,
    })));
    const updated = await this.computeRepository.updateSnapshot(compute.id, {
      instanceCount: compute.instanceCount,
      numericDataSizeBytes: compute.numericDataSizeBytes,
      lastUpdatedAt: compute.lastUpdatedAt,
    });
    return { compute: updated, sources };
  }

  async createFieldValues(sourceId: string, input: CreateFieldValuesDto): Promise<Observation[]> {
    const compute = (await this.computeRepository.findAll()).find(
      ({ id }) => id === input.computeId,
    );
    if (!compute || !compute.sourceIds.includes(sourceId)) {
      throw new NotFoundException('Source was not found in the selected compute.');
    }
    if (
      compute.comparisonModel.id !== 'period-value' ||
      compute.comparisonModel.fields.period !== 'string' ||
      compute.comparisonModel.fields.value !== 'number'
    ) {
      throw new BadRequestException('The compute comparison model cannot accept period-value observations.');
    }
    const periods = compute.periodModel.values;
    const submitted = input.values.map(({ period }) => period);
    if (
      submitted.length !== periods.length ||
      new Set(submitted).size !== submitted.length ||
      submitted.some((period) => !periods.includes(period)) ||
      input.values.some(({ value }) => !Number.isFinite(value))
    ) {
      throw new BadRequestException('Provide one numeric value for every period in this compute.');
    }
    return this.sourceRepository.saveFieldValues(
      await this.sourceRepository.requireSource(sourceId),
      input.values,
      input.overwrite,
    );
  }

  isComputeNameAvailable(name: string): Promise<boolean> {
    return this.computeRepository.isNameAvailable(name);
  }

  listComputes(): Promise<Compute[]> {
    return this.computeRepository.listComputes();
  }

  async deleteCompute(computeId: string): Promise<{ deleted: true }> {
    const compute = (await this.computeRepository.findAll()).find(({ id }) => id === computeId);
    if (!compute) throw new NotFoundException(`Compute was not found: ${computeId}`);
    await this.sourceRepository.markUpdated(compute.sourceIds, new Date());
    const result = await this.computeRepository.remove(computeId);
    await this.benchmarkService.removeCompute(computeId);
    return result;
  }

  async deleteAllComputes(): Promise<{ deleted: number }> {
    const computes = await this.computeRepository.findAll();
    const sourceIds = [...new Set(computes.flatMap((compute) => compute.sourceIds))];
    if (sourceIds.length > 0) {
      await this.sourceRepository.markUpdated(sourceIds, new Date());
    }
    const result = await this.computeRepository.removeMany(computes.map(({ id }) => id));
    await Promise.all(computes.map(({ id }) => this.benchmarkService.removeCompute(id)));
    return result;
  }

  private async ensureSourceIsNotAttached(sourceId: string): Promise<void> {
    const compute = (await this.computeRepository.findAll()).find(
      ({ sourceIds }) => sourceIds.includes(sourceId),
    );
    if (compute) {
      throw new ConflictException(
        `Source is attached to compute ${compute.name} and cannot be reset or deleted.`,
      );
    }
  }
}
