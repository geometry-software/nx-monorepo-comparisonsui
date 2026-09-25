import { BadRequestException, Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorrelationInsightPdfProvider } from '@cui/network/providers/pdf';
import type { ApiResponseContainer } from '@cui/network/providers/core';
import { alignSeries, pearsonCorrelation, uniquePairs, type NumericObservation } from './correlation/correlation';
import { comparisonDefinition, type ComparisonDefinition, type ComparisonModel } from './modules/comparison.definition';
import { BUMP_COMPARISON_PROVIDER, type BumpComparisonProvider, ComputeComparisonRepository } from './providers';
import type { CreateComputeComparisonDto } from './create-compute-comparison.dto';
import type { ExportInsightPdfDto } from './export-insight-pdf.dto';
import type {
  ComputeComparison,
  PearsonCorrelationCalculation,
} from './compute-comparison.model';
import { toComputeComparison } from './utils/compute-comparison.mapper';
import { fetchDataSource } from './utils/fetch-data-source';
import { comparisonResponse } from './utils/comparison-response';

type Compute = { id: string; name: string; description: string; sourceIds: string[]; accountSessionId: number; comparisonModel: ComparisonModel };
type DataSourceSummary = { source: { id: string; name: string; service: { model: string } } };
type DataSourceObservation = { body: Record<string, unknown> };
export const CORRELATION_INSIGHT_PDF_PROVIDER = Symbol('CORRELATION_INSIGHT_PDF_PROVIDER');
@Injectable()
export class ComparisonsService {
  constructor(
    private readonly config: ConfigService,
    private readonly mongoRepository: ComputeComparisonRepository,
    @Inject(BUMP_COMPARISON_PROVIDER) private readonly bumpRepository: BumpComparisonProvider,
    @Inject(CORRELATION_INSIGHT_PDF_PROVIDER) private readonly insightPdfProvider: CorrelationInsightPdfProvider,
  ) {}

  getDefinition(): ApiResponseContainer<ComparisonDefinition> {
    return comparisonResponse('/comparisons/definition', 'comparison-definition', comparisonDefinition);
  }

  getModel(): ApiResponseContainer<ComparisonModel> {
    return comparisonResponse('/comparisons/model', 'comparison-model', comparisonDefinition.model);
  }

  async exportInsightPdf(input: ExportInsightPdfDto): Promise<{ fileName: string; content: Buffer }> {
    const comparisons = (await this.listComputeComparisons(input.provider)).data;
    const selected = comparisons.find(({ id, provider, createdAt }) =>
      id === input.id && provider === input.provider && createdAt === input.createdAt);
    if (!selected) throw new NotFoundException('The selected comparison was not found.');
    const content = await this.insightPdfProvider.create({
      label: selected.name,
      description: selected.description ?? '',
      provider: selected.provider === 'bump' ? 'Bump file' : 'MongoDB Atlas',
      createdAt: new Date(selected.createdAt),
      pairs: selected.pearsonCorrelations,
    });
    const name = selected.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    return { fileName: `${name}-correlation-insights.pdf`, content };
  }

  async listComputeComparisons(provider?: string): Promise<ApiResponseContainer<ComputeComparison[]>> {
    if (provider && provider !== 'mongodb' && provider !== 'bump') {
      throw new BadRequestException('Provider must be mongodb or bump.');
    }
    try {
      const [entities, files] = await Promise.all([
        provider === 'bump' ? [] : this.mongoRepository.mongo.findAll(),
        provider === 'mongodb' ? [] : this.bumpRepository.findAll(),
      ]);
      const comparisons = [
        ...entities.map(toComputeComparison),
        ...files.map(({ meta, data }) => {
          const storedMeta = { ...meta } as typeof meta & { computeId?: string };
          delete storedMeta.computeId;
          return { ...storedMeta, provider: 'bump' as const, pearsonCorrelations: data };
        }),
      ].sort((left, right) =>
        right.createdAt.localeCompare(left.createdAt),
      );
      return comparisonResponse('/comparisons/computes', 'compute-comparisons', comparisons);
    } catch {
      throw new ServiceUnavailableException('Stored comparisons could not be loaded.');
    }
  }

  async createComputeComparison(input: CreateComputeComparisonDto): Promise<ApiResponseContainer<ComputeComparison>> {
    const origin = this.config.get<string>('DATA_SOURCES_SERVICE_URL')
      ?? `http://localhost:${this.config.get<string>('DATA_SOURCES_PORT') ?? '3018'}`;
    const baseUrl = `${origin.replace(/\/$/, '')}/api/data-sources`;
    const computes = await fetchDataSource<Compute[]>(`${baseUrl}/computes`);
    const compute = computes.find(({ id }) => id === input.computeId);
    if (!compute || compute.accountSessionId !== input.accountSessionId) {
      throw new NotFoundException('Compute was not found in the current account session.');
    }
    if (
      compute.comparisonModel?.id !== comparisonDefinition.model.id ||
      compute.comparisonModel.fields.period !== comparisonDefinition.model.fields.period ||
      compute.comparisonModel.fields.value !== comparisonDefinition.model.fields.value
    ) {
      throw new BadRequestException('The compute uses an unsupported comparison model.');
    }
    if (compute.sourceIds.length < 2) {
      throw new BadRequestException('A comparison requires at least two sources in the compute.');
    }
    const sourceNames = new Map(input.sources.map(({ sourceId, name }) => [sourceId, name.trim()]));
    if (
      sourceNames.size !== compute.sourceIds.length ||
      input.sources.length !== compute.sourceIds.length ||
      compute.sourceIds.some((sourceId) => !sourceNames.get(sourceId))
    ) {
      throw new BadRequestException('Provide a name for every source in the selected compute.');
    }

    const entries = await Promise.all(compute.sourceIds.map(async (sourceId) => {
      const sourceUrl = `${baseUrl}/${encodeURIComponent(sourceId)}`;
      const [summary, observations] = await Promise.all([
        fetchDataSource<DataSourceSummary>(sourceUrl),
        fetchDataSource<DataSourceObservation[]>(`${sourceUrl}/content`),
      ]);
      if (summary.source.service.model !== compute.comparisonModel.id) {
        throw new BadRequestException(`Source ${summary.source.name} does not use the period-value model.`);
      }
      if (observations.some(({ body }) =>
        typeof body?.period !== 'string' ||
        typeof body?.value !== 'number' ||
        !Number.isFinite(body.value as number)
      )) {
        throw new BadRequestException(`Source ${summary.source.name} has invalid observations.`);
      }
      const values: NumericObservation[] = observations.map(({ body }) => ({
        period: body.period as string,
        value: body.value as number,
      }));
      return { name: sourceNames.get(sourceId) as string, values };
    }));

    const pearsonCorrelations: PearsonCorrelationCalculation[] = uniquePairs(entries).map(([left, right]) => {
      const aligned = alignSeries(left.values, right.values);
      return {
        sourceA: left.name,
        sourceB: right.name,
        r: pearsonCorrelation(aligned),
        observationCount: aligned.length,
        periods: aligned.map(({ period }) => period),
        sourceAValues: aligned.map(({ left: value }) => value),
        sourceBValues: aligned.map(({ right: value }) => value),
      };
    });

    const comparison: ComputeComparison = {
      id: compute.id,
      provider: input.provider,
      name: compute.name,
      description: compute.description,
      accountSessionId: input.accountSessionId,
      sourceCount: entries.length,
      comparisonModel: compute.comparisonModel,
      pearsonCorrelations,
      createdAt: new Date().toISOString(),
    };
    try {
      if (input.provider === 'bump') {
        const { pearsonCorrelations: data, ...meta } = comparison;
        await this.bumpRepository.create(compute.name, { meta, data });
        return comparisonResponse('/comparisons/computes', 'compute-comparison', comparison);
      }
      const entity = await this.mongoRepository.mongo.create(comparison);
      return comparisonResponse('/comparisons/computes', 'compute-comparison', toComputeComparison(entity));
    } catch {
      throw new ServiceUnavailableException('Comparison could not be saved.');
    }
  }

}
