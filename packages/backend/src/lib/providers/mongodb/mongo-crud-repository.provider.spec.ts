import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import type { MongoRepository } from 'typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CrudListQueryDto } from '../models/crud-query.dto.js';
import type { EntityId } from '../models/crud.models.js';
import type { CrudRepositoryPort } from '../models/crud-repository.port.js';
import { MongoCrudRepositoryProvider } from './mongo-crud-repository.provider.js';

type Item = {
  id: EntityId;
  name: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

type CreateItem = Pick<Item, 'name' | 'quantity'>;
type UpdateItem = Partial<CreateItem>;

const options = {
  entityName: 'Item',
  searchableFields: ['name'],
  sortableFields: ['name', 'quantity', 'createdAt'],
  sortFieldMap: { quantity: 'stock' },
  defaultSort: 'createdAt',
} as const;

class ItemMongoRepository extends MongoCrudRepositoryProvider<
  Item,
  CreateItem,
  UpdateItem
> {
  constructor(repository: MongoRepository<Item>) {
    super(repository, options);
  }

  protected mapCreateDto(dto: CreateItem): Partial<Item> {
    return dto;
  }
}

function query(overrides: Partial<CrudListQueryDto> = {}): CrudListQueryDto {
  return Object.assign(new CrudListQueryDto(), overrides);
}

function item(overrides: Partial<Item> = {}): Item {
  const now = new Date('2026-09-20T12:00:00.000Z');
  return {
    id: new ObjectId().toHexString() as EntityId,
    name: 'Alpha',
    quantity: 2,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function createMongoMock() {
  const cursor = {
    sort: vi.fn().mockReturnThis(),
    skip: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    toArray: vi.fn(),
  };
  const repository = {
    createEntityCursor: vi.fn(() => cursor),
    countDocuments: vi.fn(),
    create: vi.fn((value: Partial<Item>) => value),
    save: vi.fn(),
    findOneBy: vi.fn(),
    remove: vi.fn(),
    deleteMany: vi.fn(),
  };
  return { cursor, repository };
}

function asCrudRepositoryPort(
  repository: ItemMongoRepository,
): CrudRepositoryPort<Item, CreateItem, UpdateItem> {
  return repository;
}

describe('MongoCrudRepositoryProvider', () => {
  let mongo: ReturnType<typeof createMongoMock>;
  let repository: CrudRepositoryPort<Item, CreateItem, UpdateItem>;

  beforeEach(() => {
    mongo = createMongoMock();
    repository = asCrudRepositoryPort(
      new ItemMongoRepository(
        mongo.repository as unknown as MongoRepository<Item>,
      ),
    );
  });

  it('implements findAll with escaped search, mapped sorting, and pagination', async () => {
    const rows = [item({ name: 'A+B' })];
    mongo.cursor.toArray.mockResolvedValue(rows);
    mongo.repository.countDocuments.mockResolvedValue(3);

    await expect(
      repository.findAll(
        query({
          page: 2,
          limit: 1,
          search: ' A+B ',
          sort: 'quantity',
          order: 'asc',
        }),
      ),
    ).resolves.toEqual({
      data: rows,
      meta: { page: 2, limit: 1, total: 3, totalPages: 3 },
    });

    const expectedFilter = {
      $or: [{ name: { $regex: 'A\\+B', $options: 'i' } }],
    };
    expect(mongo.repository.createEntityCursor).toHaveBeenCalledWith(
      expectedFilter,
    );
    expect(mongo.repository.countDocuments).toHaveBeenCalledWith(
      expectedFilter,
    );
    expect(mongo.cursor.sort).toHaveBeenCalledWith('stock', 1);
    expect(mongo.cursor.skip).toHaveBeenCalledWith(1);
    expect(mongo.cursor.limit).toHaveBeenCalledWith(1);
  });

  it('implements create, findOne, update, remove, and removeMany', async () => {
    const existing = item();
    const created = item({ name: 'Created' });
    mongo.repository.save
      .mockResolvedValueOnce(created)
      .mockImplementation(async (value: Item) => value);
    mongo.repository.findOneBy.mockResolvedValue(existing);
    mongo.repository.remove.mockResolvedValue(existing);
    mongo.repository.deleteMany.mockResolvedValue({ deletedCount: 2 });

    await expect(
      repository.create({ name: 'Created', quantity: 5 }),
    ).resolves.toBe(created);
    expect(mongo.repository.create).toHaveBeenCalledWith({
      name: 'Created',
      quantity: 5,
    });

    await expect(repository.findOne(existing.id)).resolves.toBe(existing);
    const findArgument = mongo.repository.findOneBy.mock.calls.at(-1)?.[0] as {
      id: ObjectId;
    };
    expect(findArgument.id).toBeInstanceOf(ObjectId);
    expect(findArgument.id.toHexString()).toBe(existing.id);

    await expect(
      repository.update(existing.id, { quantity: 7 }),
    ).resolves.toMatchObject({ quantity: 7 });
    expect(existing.updatedAt).toBeInstanceOf(Date);

    await expect(repository.remove(existing.id)).resolves.toEqual({
      deleted: true,
    });
    expect(mongo.repository.remove).toHaveBeenCalledWith(existing);

    const secondId = new ObjectId().toHexString();
    await expect(
      repository.removeMany([existing.id, secondId]),
    ).resolves.toEqual({ deleted: 2 });
    const deleteFilter = mongo.repository.deleteMany.mock.calls[0]?.[0] as {
      _id: { $in: ObjectId[] };
    };
    expect(deleteFilter._id.$in.map(String)).toEqual([existing.id, secondId]);
  });

  it('uses the port error contract for missing and invalid identifiers', async () => {
    const validId = new ObjectId().toHexString();
    mongo.repository.findOneBy.mockResolvedValue(null);

    await expect(repository.findOne(validId)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    await expect(repository.findOne('invalid-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    await expect(
      repository.removeMany([validId, 'invalid-id']),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(mongo.repository.deleteMany).not.toHaveBeenCalled();
  });
});
