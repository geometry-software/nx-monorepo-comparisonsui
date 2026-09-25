import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StartBenchmarkDto {
  @ApiProperty({ minimum: 0, maximum: 10, example: 5 })
  @IsInt()
  @Min(0)
  @Max(10)
  intervalSeconds!: number;
}

export class StopBenchmarkDto {
  @IsString()
  @IsNotEmpty()
  runId!: string;
}

export class RecordBenchmarkSampleDto extends StopBenchmarkDto {
  @IsString()
  @IsNotEmpty()
  sourceId!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  footprintBytes?: number;

  @IsInt()
  @Min(1)
  updateTimeMs!: number;

  @IsDateString()
  observedAt!: string;

  @IsOptional()
  @IsIn(['success', 'failed'])
  status?: 'success' | 'failed';

  @IsOptional()
  @IsString()
  errorMessage?: string;
}

export class BenchmarkRunReferenceDto extends StopBenchmarkDto {
  @IsString()
  @IsNotEmpty()
  computeId!: string;
}

export class ExportBenchmarkGroupDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BenchmarkRunReferenceDto)
  runs!: BenchmarkRunReferenceDto[];
}
