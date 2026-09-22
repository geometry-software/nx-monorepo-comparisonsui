import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  DynamicModule,
  Get,
  Inject,
  Injectable,
  Module,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import {
  createMongoTypeOrmOptions,
  CrudListQueryDto,
} from '@cui/network/providers';
import type { MongoRepository } from 'typeorm';
import { CreateSeriesObservationDto } from './series.dto.js';
import { SeriesObservation } from './series.entity.js';

const SERIES_OPTIONS = Symbol('SERIES_OPTIONS');

export type SeriesServiceOptions = {
  connectionKey: string;
  label: string;
  requiresValue: boolean;
};

@Injectable()
class SeriesRepository {
  constructor(
    @InjectRepository(SeriesObservation)
    private readonly repository: MongoRepository<SeriesObservation>,
    @Inject(SERIES_OPTIONS) private readonly options: SeriesServiceOptions,
  ) {}

  async findAll(query: CrudListQueryDto) {
    const sortField = ['year', 'createdAt', 'updatedAt'].includes(query.sort)
      ? query.sort
      : 'year';
    const [data, total] = await Promise.all([
      this.repository
        .createEntityCursor({})
        .sort(sortField, query.order === 'desc' ? -1 : 1)
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .toArray(),
      this.repository.count(),
    ]);
    return {
      data,
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / query.limit)),
      },
    };
  }

  async create(dto: CreateSeriesObservationDto) {
    if (this.options.requiresValue && dto.value === undefined) {
      throw new BadRequestException(`${this.options.label} requires a numeric value`);
    }
    const observation = this.repository.create({
      year: dto.year,
      ...(this.options.requiresValue ? { value: dto.value } : {}),
    });
    try {
      return await this.repository.save(observation);
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        throw new ConflictException(
          `${this.options.label} already has an observation for ${dto.year}`,
        );
      }
      throw error;
    }
  }

  async deleteAll() {
    const result = await this.repository.deleteMany({});
    return { deleted: result.deletedCount };
  }
}

function isDuplicateKeyError(error: unknown): error is { code: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  );
}

@ApiTags('observations')
@Controller('observations')
class SeriesController {
  constructor(private readonly repository: SeriesRepository) {}

  @Get()
  @ApiOperation({ summary: 'List time-series observations ordered by year' })
  @ApiOkResponse({ type: [SeriesObservation] })
  findAll(@Query() query: CrudListQueryDto) {
    return this.repository.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Record one yearly observation' })
  @ApiCreatedResponse({ type: SeriesObservation })
  create(@Body() dto: CreateSeriesObservationDto) {
    return this.repository.create(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete every observation in this data source' })
  deleteAll() {
    return this.repository.deleteAll();
  }
}

@Module({})
export class SeriesServiceModule {
  static register(options: SeriesServiceOptions): DynamicModule {
    return {
      module: SeriesServiceModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>
            createMongoTypeOrmOptions(config, options.connectionKey),
        }),
        TypeOrmModule.forFeature([SeriesObservation]),
      ],
      controllers: [SeriesController],
      providers: [
        SeriesRepository,
        { provide: SERIES_OPTIONS, useValue: options },
      ],
    };
  }
}
