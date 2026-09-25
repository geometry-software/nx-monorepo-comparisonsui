import { Body, Controller, Get, HttpCode, Post, Query, StreamableFile } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiQuery, ApiTags } from '@nestjs/swagger';
import type { ApiResponseContainer } from '@cui/network/providers/core';
import type { ComparisonDefinition, ComparisonModel } from './modules/comparison.definition';
import { ComparisonsService } from './comparisons.service';
import type { ComputeComparison } from './compute-comparison.model';
import { CreateComputeComparisonDto } from './create-compute-comparison.dto';
import { ExportInsightPdfDto } from './export-insight-pdf.dto';
import { comparisonResponseExample } from './utils/comparison-response';

@ApiTags('comparisons')
@Controller('comparisons')
export class ComparisonsController {
  constructor(private readonly comparisons: ComparisonsService) {}

  @Get('computes')
  @ApiOperation({ summary: 'List compute comparisons from MongoDB and Bump' })
  @ApiQuery({ name: 'provider', required: false, enum: ['mongodb', 'bump'], description: 'Omit to list comparisons from both providers.' })
  @ApiOkResponse({ description: 'Comparisons from the selected provider, or from both providers when omitted.' })
  async listGroups(@Query('provider') provider?: string): Promise<ApiResponseContainer<ComputeComparison[]>> {
    return this.comparisons.listComputeComparisons(provider);
  }

  @Post('computes')
  @ApiOperation({ summary: 'Compare every source pair and store the result in MongoDB or Bump' })
  @ApiBody({ type: CreateComputeComparisonDto, description: 'Select mongodb or bump as the comparison storage provider.' })
  @ApiCreatedResponse({ description: 'The created comparison includes its storage provider.' })
  async createGroup(@Body() input: CreateComputeComparisonDto): Promise<ApiResponseContainer<ComputeComparison>> {
    return this.comparisons.createComputeComparison(input);
  }

  @Get('definition')
  @ApiOperation({ summary: 'Return the initialized comparison service definition' })
  @ApiOkResponse({
    schema: {
      example: comparisonResponseExample('/comparisons/definition', 'comparison-definition', {
        model: { id: 'period-value', fields: { period: 'string', value: 'number' } },
        alignment: { field: 'period', label: 'Period' },
        metric: { field: 'r', key: 'pearson', label: 'Pearson R', minimum: -1, maximum: 1, precision: 4, emptyLabel: '—' },
        table: { pairLabel: 'Comparison', coverageLabel: 'Shared periods', pairSeparator: '–' },
      }),
    },
  })
  definition(): ApiResponseContainer<ComparisonDefinition> {
    return this.comparisons.getDefinition();
  }

  @Get('model')
  @ApiOperation({ summary: 'Return the comparison model used by this service' })
  @ApiOkResponse({ description: 'Comparison model with its field types' })
  model(): ApiResponseContainer<ComparisonModel> {
    return this.comparisons.getModel();
  }

  @Post('insights')
  @HttpCode(200)
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'Export a selected comparison as a correlation insight PDF' })
  async exportInsightPdf(@Body() input: ExportInsightPdfDto) {
    const { fileName, content } = await this.comparisons.exportInsightPdf(input);
    return new StreamableFile(content, {
      type: 'application/pdf', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }
}
