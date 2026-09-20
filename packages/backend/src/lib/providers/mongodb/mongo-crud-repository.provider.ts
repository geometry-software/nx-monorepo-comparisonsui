import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import type { DeepPartial, MongoRepository, ObjectLiteral } from 'typeorm';
import type { CrudListQueryDto } from '../models/crud-query.dto.js';
import type {
  BulkDeleteResult,
  PaginatedResult,
} from '../models/crud.models.js';
import type {
  CrudEntity,
  CrudRepositoryPort,
} from '../models/crud-repository.port.js';
import type { CrudRepositoryOptions } from '../models/crud-repository-options.js';

export abstract class MongoCrudRepositoryProvider<
  TEntity extends ObjectLiteral & CrudEntity,
  TCreateDto,
  TUpdateDto,
> implements CrudRepositoryPort<TEntity, TCreateDto, TUpdateDto>
{
  protected constructor(
    protected readonly repository: MongoRepository<TEntity>,
    protected readonly options: CrudRepositoryOptions,
  ) {}

  async findAll(query: CrudListQueryDto): Promise<PaginatedResult<TEntity>> {
    const filter = this.createFilter(query);
    const requestedSort = this.options.sortableFields.includes(query.sort)
      ? query.sort
      : (this.options.defaultSort ?? 'createdAt');
    const sort = this.options.sortFieldMap?.[requestedSort] ?? requestedSort;
    const [data, total] = await Promise.all([
      this.repository
        .createEntityCursor(filter as never)
        .sort(sort, query.order === 'asc' ? 1 : -1)
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .toArray(),
      this.repository.countDocuments(filter as never),
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

  create(dto: TCreateDto): Promise<TEntity> {
    return this.repository.save(this.repository.create(this.mapCreateDto(dto)));
  }

  async findOne(id: string): Promise<TEntity> {
    const entity = ObjectId.isValid(id)
      ? await this.repository.findOneBy({ id: new ObjectId(id) } as never)
      : null;
    if (!entity) {
      throw new NotFoundException(`${this.options.entityName} not found`);
    }
    return entity;
  }

  async update(id: string, dto: TUpdateDto): Promise<TEntity> {
    const entity = await this.findOne(id);
    return this.repository.save(
      Object.assign(entity, this.mapUpdateDto(dto), { updatedAt: new Date() }),
    );
  }

  async remove(id: string): Promise<{ deleted: true }> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return { deleted: true };
  }

  async removeMany(ids: string[]): Promise<BulkDeleteResult> {
    if (ids.some((id) => !ObjectId.isValid(id))) {
      throw new BadRequestException('One or more entity ids are invalid');
    }
    const result = await this.repository.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
    return { deleted: result.deletedCount };
  }

  protected abstract mapCreateDto(dto: TCreateDto): DeepPartial<TEntity>;

  protected createFilter(query: CrudListQueryDto): Record<string, unknown> {
    const search = query.search?.trim();
    return search
      ? {
          $or: this.options.searchableFields.map((field) => ({
            [field]: { $regex: this.escapeRegex(search), $options: 'i' },
          })),
        }
      : {};
  }

  protected mapUpdateDto(dto: TUpdateDto): DeepPartial<TEntity> {
    return dto as DeepPartial<TEntity>;
  }

  protected escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
