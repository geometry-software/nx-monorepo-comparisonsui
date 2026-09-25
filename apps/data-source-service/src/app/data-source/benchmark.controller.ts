import { Body, Controller, Get, HttpCode, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { ExportBenchmarkGroupDto, RecordBenchmarkSampleDto, StartBenchmarkDto, StopBenchmarkDto } from './benchmark.dto.js';
import { BenchmarkFileSystemService } from './services/benchmark-file-system.service.js';
import { BenchmarkService } from './services/benchmark.service.js';

type UploadedBenchmark = { originalname: string; size: number; buffer: Buffer } | undefined;

@ApiTags('benchmarks')
@Controller('data-sources')
export class BenchmarkController {
  constructor(
    private readonly benchmarks: BenchmarkService,
    private readonly files: BenchmarkFileSystemService,
  ) {}

  @Post('benchmarks/import')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 20 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Import a Benchmark Report from a Bump file' })
  importBenchmark(@UploadedFile() file: UploadedBenchmark) {
    return this.files.importReport(file);
  }

  @Post('benchmarks/import/pdf')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 20 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'Export an imported Benchmark Report as a PDF' })
  async exportImportedBenchmarkPdf(@UploadedFile() file: UploadedBenchmark) {
    const { fileName, content } = await this.files.exportPdf(file);
    return new StreamableFile(content, {
      type: 'application/pdf', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }

  @Post('benchmarks/report/bump')
  @HttpCode(200)
  @ApiOperation({ summary: 'Export one or more server benchmarks as one Bump report' })
  async exportGroupBump(@Body() input: ExportBenchmarkGroupDto) {
    const { fileName, content } = await this.benchmarks.exportGroupBumpReport(input.runs);
    return new StreamableFile(content, {
      type: 'text/plain; charset=utf-8', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }

  @Post('benchmarks/report/pdf')
  @HttpCode(200)
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'Export one or more server benchmarks as one PDF report' })
  async exportGroupPdf(@Body() input: ExportBenchmarkGroupDto) {
    const { fileName, content } = await this.benchmarks.exportGroupPdfReport(input.runs);
    return new StreamableFile(content, {
      type: 'application/pdf', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }

  @Get('computes/:id/benchmark')
  @ApiOperation({ summary: 'Get the current or last benchmark for a server' })
  get(@Param('id') computeId: string) {
    return this.benchmarks.get(computeId);
  }

  @Get('computes/:id/benchmark/status')
  @ApiOperation({ summary: 'Read a server benchmark status from in-memory storage' })
  getStatus(@Param('id') computeId: string) {
    return this.benchmarks.getStatus(computeId);
  }

  @Post('computes/:id/benchmark/start')
  @ApiOperation({ summary: 'Start a server benchmark' })
  start(@Param('id') computeId: string, @Body() input: StartBenchmarkDto) {
    return this.benchmarks.start(computeId, input.intervalSeconds);
  }

  @Post('computes/:id/benchmark/stop')
  @ApiOperation({ summary: 'Stop a server benchmark' })
  stop(@Param('id') computeId: string, @Body() input: StopBenchmarkDto) {
    return this.benchmarks.stop(computeId, input.runId);
  }

  @Post('computes/:id/benchmark/samples')
  @ApiOperation({ summary: 'Record one benchmark measurement' })
  recordSample(@Param('id') computeId: string, @Body() input: RecordBenchmarkSampleDto) {
    return this.benchmarks.recordSample(computeId, input);
  }

  @Post('computes/:id/benchmark/bump')
  @HttpCode(200)
  @ApiOperation({ summary: 'Save the last benchmark as a Bump file' })
  @ApiOkResponse({ description: 'Saved Bump report path' })
  saveBump(@Param('id') computeId: string, @Body() input: StopBenchmarkDto) {
    return this.benchmarks.saveBumpReport(computeId, input.runId);
  }

  @Get('computes/:id/benchmark/bump')
  @ApiOperation({ summary: 'Download the last benchmark Bump file' })
  async downloadBump(@Param('id') computeId: string) {
    const { fileName, content } = await this.benchmarks.downloadBumpReport(computeId);
    return new StreamableFile(content, {
      type: 'text/plain; charset=utf-8', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }

  @Post('computes/:id/benchmark/pdf')
  @HttpCode(200)
  @ApiOperation({ summary: 'Export the last benchmark as a PDF' })
  @ApiProduces('application/pdf')
  @ApiOkResponse({ description: 'Benchmark report PDF' })
  async exportPdf(@Param('id') computeId: string, @Body() input: StopBenchmarkDto) {
    const { fileName, content } = await this.benchmarks.exportPdfReport(computeId, input.runId);
    return new StreamableFile(content, {
      type: 'application/pdf', disposition: `attachment; filename="${fileName}"`, length: content.length,
    });
  }
}
