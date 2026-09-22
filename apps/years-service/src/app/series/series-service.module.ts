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
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  getRepositoryToken,
  InjectRepository,
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  createMemoryNestProvider,
  createMongoNestProvider,
  createMongoTypeOrmOptions,
  CrudListQueryDto,
  MEMORY_PROVIDER_OPTIONS,
  MONGO_PROVIDER_OPTIONS,
  type MemoryProviderOptions,
  type MemoryRepositoryPort,
  type MongoDbRepositoryPort,
  type MongoProviderOptions,
  RepositoryConflictError,
} from "@cui/network/providers";
import type { MongoRepository } from "typeorm";
import { CreateSeriesObservationDto } from "./series.dto.js";
import { SeriesObservation } from "./series.entity.js";

const SERIES_OPTIONS = Symbol("SERIES_OPTIONS");
const SERIES_MEMORY_REPOSITORY = Symbol("SERIES_MEMORY_REPOSITORY");
const SERIES_MONGO_REPOSITORY = Symbol("SERIES_MONGO_REPOSITORY");

export type SeriesServiceOptions = {
  connectionKey: string;
  label: string;
  requiresValue: boolean;
};

@Injectable()
class SeriesRepository {
  private readonly memoryIds = new Set<string>();

  constructor(
    @Inject(SERIES_MONGO_REPOSITORY)
    private readonly mongoProvider: MongoDbRepositoryPort<
      SeriesObservation,
      CreateSeriesObservationDto,
      Partial<SeriesObservation>
    >,
    @Inject(SERIES_MEMORY_REPOSITORY)
    private readonly memoryProvider: MemoryRepositoryPort<
      SeriesObservation,
      SeriesObservation,
      Partial<SeriesObservation>
    >,
    @InjectRepository(SeriesObservation)
    private readonly repository: MongoRepository<SeriesObservation>,
    @Inject(SERIES_OPTIONS) private readonly options: SeriesServiceOptions,
  ) {}

  async findAll(query: CrudListQueryDto) {
    return this.mongoProvider.findAll(query);
  }

  async create(dto: CreateSeriesObservationDto) {
    if (this.options.requiresValue && dto.value === undefined) {
      throw new BadRequestException(
        `${this.options.label} requires a numeric value`,
      );
    }
    let observation: SeriesObservation;
    try {
      observation = await this.mongoProvider.create(dto);
    } catch (error) {
      if (error instanceof RepositoryConflictError) {
        throw new ConflictException(
          `${this.options.label} already has an observation for ${dto.year}`,
        );
      }
      throw error;
    }

    await this.memoryProvider.create(observation);
    this.memoryIds.add(String(observation.id));
    return observation;
  }

  async deleteAll() {
    const result = await this.repository.deleteMany({});
    await this.memoryProvider.removeMany([...this.memoryIds]);
    this.memoryIds.clear();
    return { deleted: result.deletedCount };
  }
}

@ApiTags("observations")
@Controller("observations")
class SeriesController {
  constructor(private readonly repository: SeriesRepository) {}

  @Get()
  @ApiOperation({ summary: "List time-series observations ordered by year" })
  @ApiOkResponse({ type: [SeriesObservation] })
  findAll(@Query() query: CrudListQueryDto) {
    return this.repository.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: "Record one yearly observation" })
  @ApiCreatedResponse({ type: SeriesObservation })
  create(@Body() dto: CreateSeriesObservationDto) {
    return this.repository.create(dto);
  }

  @Delete()
  @ApiOperation({ summary: "Delete every observation in this data source" })
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
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
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
        {
          provide: MONGO_PROVIDER_OPTIONS,
          useFactory: (
            repository: MongoRepository<SeriesObservation>,
            serviceOptions: SeriesServiceOptions,
          ): MongoProviderOptions<
            SeriesObservation,
            CreateSeriesObservationDto,
            Partial<SeriesObservation>
          > => ({
            repository,
            options: createRepositoryOptions(serviceOptions),
            create: (value) => ({
              year: value.year,
              ...(serviceOptions.requiresValue
                ? { value: value.value }
                : {}),
            }),
          }),
          inject: [getRepositoryToken(SeriesObservation), SERIES_OPTIONS],
        },
        createMongoNestProvider<
          SeriesObservation,
          CreateSeriesObservationDto,
          Partial<SeriesObservation>
        >(SERIES_MONGO_REPOSITORY),
        {
          provide: MEMORY_PROVIDER_OPTIONS,
          useFactory: (
            serviceOptions: SeriesServiceOptions,
          ): MemoryProviderOptions<
            SeriesObservation,
            SeriesObservation,
            Partial<SeriesObservation>
          > => ({
            options: createRepositoryOptions(serviceOptions),
            getId: (value) => String(value.id),
            createId: (value) => String(value.id),
            create: (value) => value,
            update: (current, value, now) =>
              Object.assign(current, value, { updatedAt: now }),
          }),
          inject: [SERIES_OPTIONS],
        },
        createMemoryNestProvider<
          SeriesObservation,
          SeriesObservation,
          Partial<SeriesObservation>
        >(SERIES_MEMORY_REPOSITORY),
      ],
    };
  }
}

function createRepositoryOptions(options: SeriesServiceOptions) {
  return {
    entityName: options.label,
    searchableFields: [],
    sortableFields: ["year", "createdAt", "updatedAt"],
    defaultSort: "year",
  } as const;
}
