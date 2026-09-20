import type { CrudListQueryDto } from './crud-query.dto.js';
import type {
  BulkDeleteResult,
  EntityId,
  PaginatedResult,
} from './crud.models.js';

export type CrudEntity = {
  id: EntityId;
  updatedAt: Date;
  createdAt?: Date;
};

/**
 * Persistence boundary shared by database-backed and process-memory providers.
 */
export interface CrudRepositoryPort<
  TEntity extends CrudEntity,
  TCreateDto,
  TUpdateDto,
> {
  findAll(query: CrudListQueryDto): Promise<PaginatedResult<TEntity>>;
  create(dto: TCreateDto): Promise<TEntity>;
  findOne(id: string): Promise<TEntity>;
  update(id: string, dto: TUpdateDto): Promise<TEntity>;
  remove(id: string): Promise<{ deleted: true }>;
  removeMany(ids: string[]): Promise<BulkDeleteResult>;
}
