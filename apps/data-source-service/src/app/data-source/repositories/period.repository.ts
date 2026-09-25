import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { MongoServerError, type Collection } from 'mongodb';
import type { MongoDbCollectionRepositoryProvider } from '@cui/network/providers/mongodb';
import { randomUUID } from 'node:crypto';
import type { CreatePeriodDto } from '../data-source.dto.js';
import type { Period } from '../data-source.models.js';
import type { PeriodEntity } from '../entities/index.js';
import { SOURCE_MONGO_REPOSITORY_PROVIDER } from './repository.tokens.js';

@Injectable()
export class PeriodRepository {
  private collectionPromise?: Promise<Collection<PeriodEntity>>;

  constructor(
    @Inject(SOURCE_MONGO_REPOSITORY_PROVIDER)
    private readonly mongo: MongoDbCollectionRepositoryProvider,
  ) {}

  async findAll(): Promise<PeriodEntity[]> {
    return (await this.getCollection()).find().sort({ createdAt: 1 }).toArray();
  }

  async findById(id: string): Promise<PeriodEntity | null> {
    return (await this.getCollection()).findOne({ _id: id });
  }

  async findByName(name: string): Promise<PeriodEntity | null> {
    return (await this.getCollection()).findOne({ name });
  }

  async create(period: PeriodEntity): Promise<void> {
    await (await this.getCollection()).insertOne(period);
  }

  async listPeriods(): Promise<Period[]> {
    return (await this.findAll()).map(toPeriod);
  }

  async isNameAvailable(name: string): Promise<boolean> {
    if (!/^[a-z]{1,63}$/.test(name)) return false;
    return (await this.findByName(name)) === null;
  }

  async createPeriod(input: CreatePeriodDto): Promise<Period> {
    const name = input.name.trim();
    const values = input.values.map((value) => value.trim());
    if (!/^[a-z]{1,63}$/.test(name)) {
      throw new BadRequestException('Period name must contain only lowercase Latin letters, up to 63 characters.');
    }
    if (input.unit !== 'year' && input.unit !== 'day') {
      throw new BadRequestException('Period type must be year or day.');
    }
    if (
      values.length === 0 ||
      new Set(values).size !== values.length ||
      values.some((value) => !isValidPeriodValue(input.unit, value))
    ) {
      throw new BadRequestException('Period IDs must be unique, valid years or calendar days for the selected type.');
    }
    if (await this.findByName(name)) {
      throw new ConflictException('A period with this name already exists.');
    }
    const existingPeriods = await this.findAll();
    if (existingPeriods.some((period) =>
      period.unit === input.unit &&
      period.values.length === values.length &&
      values.every((value) => period.values.includes(value))
    )) {
      throw new ConflictException('A period with the same type and IDs already exists.');
    }
    const period: PeriodEntity = {
      _id: randomUUID(),
      name,
      unit: input.unit,
      values,
      createdAt: new Date(),
    };
    try {
      await this.create(period);
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException('A period with this name already exists.');
      }
      throw error;
    }
    return toPeriod(period);
  }

  private getCollection(): Promise<Collection<PeriodEntity>> {
    this.collectionPromise ??= (async () => {
      const collection = await this.mongo.getCollection<PeriodEntity>("data_source_periods");
      await collection.createIndex({ name: 1 }, { unique: true });
      return collection;
    })();
    return this.collectionPromise;
  }
}

function toPeriod(period: PeriodEntity): Period {
  return {
    id: period._id,
    name: period.name,
    unit: period.unit,
    values: period.values,
    createdAt: period.createdAt,
  };
}

function isValidPeriodValue(unit: 'year' | 'day', value: string): boolean {
  if (unit === 'year') return /^\d{4}$/.test(value) && value !== '0000';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000')) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
