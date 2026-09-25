import { randomUUID } from 'node:crypto';
import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { BumpModel } from './bump-model.js';

const FILE_SUFFIX = '.bump.ts';
const EXPORT_PREFIX = 'export const bump = ';
const LEGACY_EXPORT_PREFIXES = ['export const Bump = ', 'export const bump: BumpModel = '];

export class BumpProvider<Meta extends object, Data> {
  constructor(private readonly directory: string) {}

  async create(name: string, model: BumpModel<Meta, Data>): Promise<void> {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(name)) {
      throw new Error('Bump file names may contain only letters, digits, hyphens, and underscores.');
    }
    await mkdir(this.directory, { recursive: true });
    const target = join(this.directory, `${name}${FILE_SUFFIX}`);
    const temporary = join(this.directory, `${name}.${randomUUID()}.tmp`);
    const source = `${EXPORT_PREFIX}${JSON.stringify(model, null, 2)};\n`;
    await writeFile(temporary, source, { encoding: 'utf8', flag: 'wx' });
    await rename(temporary, target);
  }

  async findAll(): Promise<BumpModel<Meta, Data>[]> {
    let names: string[];
    try {
      names = await readdir(this.directory);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw error;
    }
    return Promise.all(names.filter((name) => name.endsWith(FILE_SUFFIX)).map(async (name) => {
      const source = await readFile(join(this.directory, name), 'utf8');
      return this.parse(source);
    }));
  }

  async read(name: string): Promise<Buffer> {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(name)) {
      throw new Error('Bump file names may contain only letters, digits, hyphens, and underscores.');
    }
    return readFile(join(this.directory, `${name}${FILE_SUFFIX}`));
  }

  async findOne(name: string): Promise<BumpModel<Meta, Data>> {
    return this.parse((await this.read(name)).toString('utf8'));
  }

  parse(source: string): BumpModel<Meta, Data> {
    const trimmed = source.trim();
    const prefix = [EXPORT_PREFIX, ...LEGACY_EXPORT_PREFIXES].find((candidate) => trimmed.startsWith(candidate));
    if (!prefix) throw new Error('The Bump file has no supported data export.');
    const serialized = trimmed.slice(prefix.length).trim().replace(/;$/, '');
    const model: unknown = JSON.parse(serialized);
    if (!model || typeof model !== 'object' || !('meta' in model) || !('data' in model) ||
        !model.meta || typeof model.meta !== 'object' || !Array.isArray(model.data)) {
      throw new Error('The Bump file has an invalid model.');
    }
    return model as BumpModel<Meta, Data>;
  }
}
