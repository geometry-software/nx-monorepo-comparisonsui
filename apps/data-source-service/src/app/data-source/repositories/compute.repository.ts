import { Inject, Injectable } from '@nestjs/common';
import type { MemoryRepositoryPort } from '@cui/network/providers/memory';
import type { Compute } from '../data-source.models.js';
import { getComputeNameValidationError } from '../data-source.dto.js';
import { COMPUTE_MEMORY_REPOSITORY_PROVIDER } from './repository.tokens.js';

export { COMPUTE_MEMORY_REPOSITORY_PROVIDER } from './repository.tokens.js';

@Injectable()
export class ComputeRepository {
  constructor(
    @Inject(COMPUTE_MEMORY_REPOSITORY_PROVIDER)
    private readonly memory: MemoryRepositoryPort<Compute, Compute, Partial<Compute>>,
  ) {}

  findAll(): Promise<Compute[]> {
    return this.memory.findAll();
  }

  async isNameAvailable(name: string): Promise<boolean> {
    if (getComputeNameValidationError(name)) return false;
    return !(await this.findAll()).some(
      (compute) => compute.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async listComputes(): Promise<Compute[]> {
    return (await this.findAll()).sort(
      (left, right) => right.createdAt.getTime() - left.createdAt.getTime(),
    );
  }

  create(compute: Compute): Promise<Compute> {
    return this.memory.create(compute);
  }

  async findById(id: string): Promise<Compute | null> {
    return (await this.findAll()).find((compute) => compute.id === id) ?? null;
  }

  updateSnapshot(
    id: string,
    changes: Pick<Compute, 'instanceCount' | 'numericDataSizeBytes' | 'lastUpdatedAt'>,
  ): Promise<Compute> {
    return this.memory.update(id, changes);
  }

  remove(id: string): Promise<{ deleted: true }> {
    return this.memory.remove(id);
  }

  removeMany(ids: string[]): Promise<{ deleted: number }> {
    return this.memory.removeMany(ids);
  }
}
