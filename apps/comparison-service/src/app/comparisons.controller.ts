import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  createApiResponseContainer,
  type ApiEndpoint,
  type ApiResponseContainer,
  type BulkDeleteResult,
} from '@nx-react-nestjs/backend';
import type { Comparison } from './comparison.entity';
import type { ComparisonDefinition } from './comparison.definition';
import { ComparisonsService } from './comparisons.service';

function responseExample(path: `/${string}`, resource: string, data: unknown) {
  return {
    endpoint: {
      network: { protocol: 'inherit', hostname: 'current', port: 3017, basePath: '/api', path },
      metadata: {
        service: 'comparisons', label: 'Comparison Orchestrator',
        kind: 'orchestrator', version: 'v1', resource,
      },
    },
    data,
  };
}

@ApiTags('comparisons')
@Controller('comparisons')
export class ComparisonsController {
  constructor(private readonly comparisons: ComparisonsService) {}

  private endpoint(path: `/${string}`, resource: string): ApiEndpoint {
    return {
      network: {
        protocol: 'inherit',
        hostname: 'current',
        port: Number(process.env.COMPARISONS_PORT || 3017),
        basePath: '/api',
        path,
      },
      metadata: {
        service: 'comparisons',
        label: 'Comparison Orchestrator',
        kind: 'orchestrator',
        version: 'v1',
        resource,
      },
    };
  }

  private container<Data>(path: `/${string}`, resource: string, data: Data) {
    return createApiResponseContainer(this.endpoint(path, resource), data);
  }

  @Get('definition')
  @ApiOperation({ summary: 'Return the initialized comparison service definition' })
  @ApiOkResponse({
    schema: {
      example: responseExample('/comparisons/definition', 'comparison-definition', {
        sources: [{ key: 'Year', label: 'Year' }, { key: 'TGI', label: 'TGI' }],
        pairCount: 1,
        alignment: { field: 'year', label: 'Year' },
        metric: { field: 'r', key: 'pearson', label: 'Pearson R', minimum: -1, maximum: 1, precision: 4, emptyLabel: '—' },
        table: { idLabel: 'ID', pairLabel: 'Comparison', coverageLabel: 'Shared years', pairSeparator: '–' },
      }),
    },
  })
  definition(): ApiResponseContainer<ComparisonDefinition> {
    return this.container('/comparisons/definition', 'comparison-definition', this.comparisons.getDefinition());
  }

  @Get()
  @ApiOperation({ summary: 'Return the stored comparison table' })
  @ApiOkResponse({ schema: { example: responseExample('/comparisons', 'comparisons', []) } })
  async list(): Promise<ApiResponseContainer<Comparison[]>> {
    return this.container('/comparisons', 'comparisons', await this.comparisons.list());
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Fetch sources, align years, calculate and store configured Pearson correlations' })
  @ApiOkResponse({ schema: { example: responseExample('/comparisons/refresh', 'comparisons', []) } })
  async refresh(): Promise<ApiResponseContainer<Comparison[]>> {
    return this.container('/comparisons/refresh', 'comparisons', await this.comparisons.refresh());
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all stored comparisons' })
  @ApiOkResponse({ schema: { example: responseExample('/comparisons', 'comparisons', { deleted: 1 }) } })
  async deleteAll(): Promise<ApiResponseContainer<BulkDeleteResult>> {
    return this.container('/comparisons', 'comparisons', await this.comparisons.deleteAll());
  }
}
