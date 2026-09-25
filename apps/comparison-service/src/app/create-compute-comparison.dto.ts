import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from 'class-validator';

export class ComparisonSourceNameDto {
  @ApiProperty({ example: 'source-uuid' })
  @IsString()
  @IsNotEmpty()
  sourceId!: string;

  @ApiProperty({ example: 'Revenue' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CreateComputeComparisonDto {
  @ApiProperty({ enum: ['mongodb', 'bump'], example: 'mongodb' })
  @IsIn(['mongodb', 'bump'])
  provider!: 'mongodb' | 'bump';

  @ApiProperty({ example: 'compute-uuid' })
  @IsString()
  @IsNotEmpty()
  computeId!: string;

  @ApiProperty({ example: 42 })
  @IsInt()
  @IsPositive()
  accountSessionId!: number;

  @ApiProperty({ type: [ComparisonSourceNameDto] })
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => ComparisonSourceNameDto)
  sources!: ComparisonSourceNameDto[];
}
