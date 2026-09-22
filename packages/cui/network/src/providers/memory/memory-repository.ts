import {
  RepositoryConflictError,
  RepositoryNotFoundError,
  RepositoryValidationError,
} from "../core/errors.js";
import { isValidPageQuery } from "../core/query.js";
import type { PaginatedResult, RepositoryOptions } from "../core/types.js";
import type { MemoryRepositoryPort } from "./types.js";

export type MemoryProviderContext<TId> = {
  id: TId;
  now: Date;
};

export type MemoryProviderConfig<TData, TCreate, TUpdate, TId = string> = {
  options: RepositoryOptions<TData>;
  initialData?: readonly TData[];
  getId: (value: TData) => TId;
  createId: (value: TCreate) => TId;
  create: (value: TCreate, context: MemoryProviderContext<TId>) => TData;
  update: (current: TData, value: TUpdate, now: Date) => TData;
};

export type MemoryProviderOptions<
  TData,
  TCreate,
  TUpdate,
  TId = string,
> = MemoryProviderConfig<TData, TCreate, TUpdate, TId>;

export function createMemoryProvider<TData, TCreate, TUpdate, TId = string>(
  config: MemoryProviderConfig<TData, TCreate, TUpdate, TId>,
): MemoryRepositoryPort<TData, TCreate, TUpdate, TId> {
  const values = new Map<TId, TData>();
  for (const value of config.initialData ?? []) {
    values.set(config.getId(value), value);
  }

  const findOne = async (id: TId): Promise<TData> => {
    const value = values.get(id);
    if (value === undefined) {
      throw new RepositoryNotFoundError(config.options.entityName, id);
    }
    return value;
  };

  return {
    async findAll(query): Promise<PaginatedResult<TData>> {
      if (!isValidPageQuery(query)) {
        throw new RepositoryValidationError(
          "Memory pagination requires positive integer page and limit values",
        );
      }
      const search = query.search?.trim().toLocaleLowerCase();
      const requestedSort = config.options.sortableFields.includes(
        query.sort as Extract<keyof TData, string>,
      )
        ? query.sort
        : (config.options.defaultSort ?? "createdAt");
      const sort =
        config.options.sortFieldMap?.[requestedSort] ?? requestedSort;
      const direction = query.order === "asc" ? 1 : -1;
      const matches = [...values.values()]
        .filter((value) => matchesFilter(value, query.filter))
        .filter((value) =>
          search
            ? config.options.searchableFields.some((field) =>
                String(readField(value, field) ?? "")
                  .toLocaleLowerCase()
                  .includes(search),
              )
            : true,
        )
        .sort(
          (left, right) =>
            compare(readField(left, sort), readField(right, sort)) * direction,
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
    },

    async create(value) {
      const id = config.createId(value);
      if (values.has(id)) {
        throw new RepositoryConflictError(
          `${config.options.entityName} already exists: ${String(id)}`,
        );
      }
      const created = config.create(value, { id, now: new Date() });
      values.set(config.getId(created), created);
      return created;
    },

    findOne,

    async update(id, value) {
      const current = await findOne(id);
      const updated = config.update(current, value, new Date());
      values.set(id, updated);
      return updated;
    },

    async remove(id) {
      await findOne(id);
      values.delete(id);
      return { deleted: true };
    },

    async removeMany(ids) {
      let deleted = 0;
      for (const id of new Set(ids)) {
        deleted += values.delete(id) ? 1 : 0;
      }
      return { deleted };
    },
  };
}

function matchesFilter<TData>(
  value: TData,
  filter: Partial<TData> | undefined,
): boolean {
  if (!filter) return true;
  return Object.entries(filter).every(
    ([field, expected]) => readField(value, field) === expected,
  );
}

function readField<TData>(value: TData, field: string): unknown {
  return (value as Record<string, unknown>)[field];
}

function compare(left: unknown, right: unknown): number {
  const leftValue = comparableValue(left);
  const rightValue = comparableValue(right);
  if (leftValue === rightValue) return 0;
  if (leftValue === undefined || leftValue === null) return -1;
  if (rightValue === undefined || rightValue === null) return 1;
  return leftValue < rightValue ? -1 : 1;
}

function comparableValue(value: unknown): unknown {
  if (value instanceof Date) return value.getTime();
  if (
    typeof value === "object" &&
    value !== null &&
    "toMillis" in value &&
    typeof value.toMillis === "function"
  ) {
    return value.toMillis();
  }
  return value;
}
