import { describe, expect, it } from 'vitest';
import { CrudListQueryDto } from '../models/crud-query.dto.js';
import type { EntityId } from '../models/crud.models.js';
import type { CrudRepositoryPort } from '../models/crud-repository.port.js';
import { InMemoryRepositoryProvider } from './in-memory-repository.provider.js';

type Item = {
  id: EntityId;
  name: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

type CreateItem = Pick<Item, 'name' | 'quantity'>;
type UpdateItem = Partial<CreateItem>;

class ItemRepository extends InMemoryRepositoryProvider<
  Item,
  CreateItem,
  UpdateItem
> {
  constructor() {
    super({
      entityName: 'Item',
      searchableFields: ['name'],
      sortableFields: ['name', 'quantity', 'createdAt'],
      defaultSort: 'createdAt',
    });
  }

  protected mapCreateDto(dto: CreateItem): Partial<Item> {
    return dto;
  }
}

function query(overrides: Partial<CrudListQueryDto> = {}): CrudListQueryDto {
  return Object.assign(new CrudListQueryDto(), overrides);
}

function asCrudRepositoryPort(
  repository: ItemRepository,
): CrudRepositoryPort<Item, CreateItem, UpdateItem> {
  return repository;
}

describe('InMemoryRepositoryProvider', () => {
  it('implements every CrudRepositoryPort operation', async () => {
    const repository = asCrudRepositoryPort(new ItemRepository());
    const first = await repository.create({ name: 'Beta', quantity: 2 });
    const second = await repository.create({ name: 'Alpha', quantity: 1 });
    const removable = await repository.create({ name: 'Gamma', quantity: 4 });

    expect(
      await repository.findAll(
        query({ search: 'a', sort: 'name', order: 'asc', limit: 1 }),
      ),
    ).toMatchObject({
      data: [{ id: second.id, name: 'Alpha' }],
      meta: { page: 1, limit: 1, total: 2, totalPages: 2 },
    });

    await expect(repository.findOne(first.id)).resolves.toBe(first);
    await expect(repository.update(first.id, { quantity: 3 })).resolves.toMatchObject({
      quantity: 3,
    });
    await expect(repository.remove(removable.id)).resolves.toEqual({
      deleted: true,
    });
    await expect(repository.findOne(removable.id)).rejects.toThrow(
      'Item not found',
    );
    await expect(repository.removeMany([first.id, second.id])).resolves.toEqual({
      deleted: 2,
    });
    await expect(repository.findOne(first.id)).rejects.toThrow('Item not found');
  });

  it('keeps data only on the current provider instance', async () => {
    const runningApplicationRepository = asCrudRepositoryPort(
      new ItemRepository(),
    );
    await runningApplicationRepository.create({ name: 'Temporary', quantity: 1 });

    const restartedApplicationRepository = asCrudRepositoryPort(
      new ItemRepository(),
    );
    await expect(
      restartedApplicationRepository.findAll(query()),
    ).resolves.toMatchObject({ data: [], meta: { total: 0 } });
  });
});
