import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, StreamableFile } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateComputeDto, DataSourceService, ValidateComputeSourcesDto } from './index.js';

@ApiTags('computes')
@Controller('data-sources/computes')
export class ComputeController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Get()
  @ApiOperation({ summary: 'List in-memory computes' })
  @ApiOkResponse({ description: 'Computes' })
  listComputes() {
    return this.dataSourceService.listComputes();
  }

  @Post('validate-sources')
  @HttpCode(200)
  @ApiOperation({ summary: 'Check that selected compute sources are registered' })
  validateComputeSources(@Body() input: ValidateComputeSourcesDto) {
    return this.dataSourceService.validateComputeSources(input.sourceIds);
  }

  @Get('name-availability')
  @ApiOperation({ summary: 'Check whether a compute name is available' })
  @ApiOkResponse({ description: 'Compute name availability' })
  async computeNameAvailability(@Query('name') name = '') {
    return {
      available: await this.dataSourceService.isComputeNameAvailable(name),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create an in-memory compute from registered sources' })
  @ApiCreatedResponse({ description: 'Created compute and source summaries' })
  createCompute(@Body() input: CreateComputeDto) {
    return this.dataSourceService.createCompute(input);
  }

  @Post(':id/refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh one compute and all its source metadata' })
  @ApiOkResponse({ description: 'Updated compute and source summaries' })
  refreshCompute(@Param('id') computeId: string) {
    return this.dataSourceService.refreshCompute(computeId);
  }

  @Get(':id/model')
  @ApiOperation({ summary: 'Read the saved server model' })
  getServerModel(@Param('id') computeId: string) {
    return this.dataSourceService.getServerModel(computeId);
  }

  @Get(':id/model/bump')
  @ApiOperation({ summary: 'Download the server model Bump file' })
  async downloadServerModel(@Param('id') computeId: string) {
    const { fileName, content } = await this.dataSourceService.downloadServerModel(computeId);
    return new StreamableFile(content, {
      type: 'text/plain; charset=utf-8', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all computes and release their sources' })
  @ApiOkResponse({ description: 'Number of deleted computes' })
  deleteAllComputes() {
    return this.dataSourceService.deleteAllComputes();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one compute and release its sources' })
  @ApiOkResponse({ description: 'Deleted compute' })
  deleteCompute(@Param('id') computeId: string) {
    return this.dataSourceService.deleteCompute(computeId);
  }
}
