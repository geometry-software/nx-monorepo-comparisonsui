import { NotFoundException } from '@nestjs/common';
import type { CrudListQueryDto } from '../models/crud-query.dto.js';
import type {
  BulkDeleteResult,
  EntityId,
  PaginatedResult,
} from '../models/crud.models.js';
import type {
  CrudEntity,
  CrudRepositoryPort,
} from '../models/crud-repository.port.js';
import type { CrudRepositoryOptions } from '../models/crud-repository-options.js';

/**
 * CRUD provider whose state is scoped to the lifetime of its Node.js process.
 * Restarting the application creates a new, empty provider instance.
 */
export abstract class InMemoryRepositoryProvider<
  TEntity extends CrudEntity,
  TCreateDto,
  TUpdateDto,
> implements CrudRepositoryPort<TEntity, TCreateDto, TUpdateDto>
{
  private readonly entities = new Map<string, TEntity>();
  private nextId = 1;

  protected constructor(
    protected readonly options: CrudRepositoryOptions,
    initialEntities: readonly TEntity[] = [],
  ) {
    for (const entity of initialEntities) {
      this.entities.set(String(entity.id), entity);
    }
  }

  async findAll(query: CrudListQueryDto): Promise<PaginatedResult<TEntity>> {
    const search = query.search?.trim().toLocaleLowerCase();
    const requestedSort = this.options.sortableFields.includes(query.sort)
      ? query.sort
      : (this.options.defaultSort ?? 'createdAt');
    const sortField = this.options.sortFieldMap?.[requestedSort] ?? requestedSort;
    const direction = query.order === 'asc' ? 1 : -1;

    const matches = [...this.entities.values()]
      .filter((entity) =>
        search
          ? this.options.searchableFields.some((field) =>
              String(this.readField(entity, field) ?? '')
                .toLocaleLowerCase()
                .includes(search),
            )
          : true,
      )
      .sort(
        (left, right) =>
          this.compare(
            this.readField(left, sortField),
            this.readField(right, sortField),
          ) * direction,
      );

    const start = (query.page - 1) * query.limit;
    const total = matches.length;
    return {
      data: matches.slice(start, start + query.limit),
      meta: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / query.limit)),
      },
    };
  }

  async create(dto: TCreateDto): Promise<TEntity> {
    const now = new Date();
    const entity = {
      ...this.mapCreateDto(dto),
      id: String(this.nextId++) as EntityId,
      createdAt: now,
      updatedAt: now,
    } as TEntity;
    this.entities.set(String(entity.id), entity);
    return entity;
  }

  async findOne(id: string): Promise<TEntity> {
    const entity = this.entities.get(id);
    if (!entity) {
      throw new NotFoundException(`${this.options.entityName} not found`);
    }
    return entity;
  }

  async update(id: string, dto: TUpdateDto): Promise<TEntity> {
    const current = await this.findOne(id);
    const entity = Object.assign(current, this.mapUpdateDto(dto), {
      updatedAt: new Date(),
    });
    this.entities.set(id, entity);
    return entity;
  }

  async remove(id: string): Promise<{ deleted: true }> {
    await this.findOne(id);
    this.entities.delete(id);
    return { deleted: true };
  }

  async removeMany(ids: string[]): Promise<BulkDeleteResult> {
    let deleted = 0;
    for (const id of new Set(ids)) {
      deleted += this.entities.delete(id) ? 1 : 0;
    }
    return { deleted };
  }

  protected abstract mapCreateDto(dto: TCreateDto): Partial<TEntity>;

  protected mapUpdateDto(dto: TUpdateDto): Partial<TEntity> {
    return dto as Partial<TEntity>;
  }

  private readField(entity: TEntity, field: string): unknown {
    return (entity as Record<string, unknown>)[field];
  }

  private compare(left: unknown, right: unknown): number {
    const leftValue = left instanceof Date ? left.getTime() : left;
    const rightValue = right instanceof Date ? right.getTime() : right;
    if (leftValue === rightValue) return 0;
    if (leftValue === undefined || leftValue === null) return -1;
    if (rightValue === undefined || rightValue === null) return 1;
    return leftValue < rightValue ? -1 : 1;
  }
}
