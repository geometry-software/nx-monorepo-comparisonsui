import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { alignSeries, pearsonCorrelation, uniquePairs, type NumericObservation } from './correlation/correlation';
import type { MongoRepository } from 'typeorm';
import { Comparison } from './comparison.entity';
import {
  comparisonSources,
  createComparisonDefinition,
} from './comparison.definition';

type UpstreamObservation = { year: number; value?: number | null };
type SeriesResponse = { data: UpstreamObservation[] };

@Injectable()
export class ComparisonsService {
  private readonly definition = createComparisonDefinition(comparisonSources);
  private readonly pairKeys = uniquePairs(comparisonSources.map(({ key }) => key))
    .map(([left, right]) => `${left}--${right}`);

  constructor(
    @InjectRepository(Comparison) private readonly repository: MongoRepository<Comparison>,
    private readonly config: ConfigService,
  ) {}

  getDefinition() {
    return this.definition;
  }

  async list() {
    const comparisons = await this.repository.find({ order: { pairKey: 'ASC' } });
    return comparisons.filter(({ pairKey }) => this.pairKeys.includes(pairKey));
  }

  async refresh() {
    let entries: Array<readonly [string, NumericObservation[]]>;
    try {
      entries = await Promise.all(comparisonSources.map(async (source) => {
        const origin = this.config.get<string>(source.urlKey) ?? source.fallback;
        const response = await fetch(`${origin}/api/observations?page=1&limit=100&sort=year&order=asc`);
        if (!response.ok) throw new Error(`${source.key} returned ${response.status}`);
        const payload = await response.json() as SeriesResponse;
        const observations = payload.data.flatMap((item): NumericObservation[] => {
          const value = source.valueField === 'year' ? item.year : item.value;
          return typeof value === 'number' ? [{ year: item.year, value }] : [];
        });
        return [source.key, observations] as const;
      }));
    } catch (error) {
      throw new ServiceUnavailableException({
        message: 'One or more time-series services are unavailable',
        cause: error instanceof Error ? error.message : 'Unknown upstream error',
      });
    }

    const series = new Map(entries);
    await this.repository.deleteMany({});
    const comparisons = await Promise.all(uniquePairs(comparisonSources.map(({ key }) => key)).map(async ([left, right]) => {
      const aligned = alignSeries(series.get(left) ?? [], series.get(right) ?? []);
      const pairKey = `${left}--${right}`;
      return this.repository.save(this.repository.create({
        pairKey, leftEntity: left, rightEntity: right,
        r: pearsonCorrelation(aligned), observationCount: aligned.length,
        years: aligned.map(({ year }) => year),
        leftValues: aligned.map(({ left: value }) => value),
        rightValues: aligned.map(({ right: value }) => value),
        updatedAt: new Date(),
      }));
    }));
    return comparisons.sort((a, b) => a.pairKey.localeCompare(b.pairKey));
  }

  async deleteAll() {
    const result = await this.repository.deleteMany({});
    return { deleted: result.deletedCount };
  }
}
