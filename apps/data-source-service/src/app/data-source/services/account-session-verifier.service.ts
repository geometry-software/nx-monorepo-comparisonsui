import {
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { RepositoryNotFoundError } from '@cui/network/providers/core';
import { createSupabaseProvider, SupabaseClientProvider, type SupabaseRepositoryPort } from '@cui/network/providers/supabase';

export type AccountSessionVerifierOptions = {
  url: string;
  publishableKey: string;
};

type AccountSessionRecord = {
  id: number;
  verified_at: string | null;
  closed_at: string | null;
};

export class AccountSessionVerifierService {
  private readonly sessions: SupabaseRepositoryPort<AccountSessionRecord>;

  constructor(options: AccountSessionVerifierOptions) {
    const client = new SupabaseClientProvider(options.url, options.publishableKey);
    this.sessions = createSupabaseProvider<AccountSessionRecord, AccountSessionRecord, AccountSessionRecord>({
      client: client.client,
      tableName: 'sessions',
      options: {
        entityName: 'account session',
        searchableFields: ['id'],
        sortableFields: ['id'],
        defaultSort: 'id',
      },
    });
  }

  async verify(sessionId: number): Promise<number> {
    let data: AccountSessionRecord;
    try {
      data = await this.sessions.findOne(String(sessionId));
    } catch (error) {
      if (error instanceof RepositoryNotFoundError) {
        throw new UnauthorizedException('An open verified account session is required.');
      }
      throw new ServiceUnavailableException(
        `The Supabase session provider could not verify the session: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
    if (data.closed_at || !data.verified_at) {
      throw new UnauthorizedException(
        "An open verified account session is required.",
      );
    }
    return Number(data.id);
  }
}
