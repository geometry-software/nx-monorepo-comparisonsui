import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  ValidateBy,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export const dataSourceProviders = ["memory", "mongodb", "firebase"] as const;
export type DataSourceProvider = (typeof dataSourceProviders)[number];
export const periodUnits = ["year", "day"] as const;

export function getComputeNameValidationError(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length === 0) return "Compute name is required.";
  if (value.startsWith("_")) return "Compute name cannot start with an underscore.";
  if (value.endsWith("_")) return "Compute name cannot end with an underscore.";
  if (value.length > 20) return "Compute name must be at most 20 characters.";
  if (!/^[a-z_]+$/.test(value)) {
    return "Use only lowercase Latin letters (a–z) and underscores.";
  }
  return undefined;
}

export class CreateDataSourceDto {
  @ApiProperty({ example: "customer_events" })
  @IsNotEmpty()
  @Matches(/^[A-Za-z][A-Za-z0-9_-]{0,62}$/, {
    message:
      "Name must start with a letter and contain only letters, numbers, underscores, or hyphens.",
  })
  name!: string;

  @ApiPropertyOptional({ example: "Customer events collected by this source" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: dataSourceProviders })
  @IsIn(dataSourceProviders)
  provider!: DataSourceProvider;
}

export class CreateObservationDto {
  @ApiProperty({ example: "2026" })
  @IsString()
  @IsNotEmpty()
  period!: string;

  @ApiProperty({ example: 42.5 })
  @IsNumber()
  value!: number;
}

export class CreateFieldValuesDto {
  @ApiProperty({ example: "compute-uuid" })
  @IsString()
  @IsNotEmpty()
  computeId!: string;

  @ApiProperty({ type: [CreateObservationDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateObservationDto)
  values!: CreateObservationDto[];

  @ApiPropertyOptional({ description: "Replace existing values for the submitted periods" })
  @IsOptional()
  @IsBoolean()
  overwrite?: boolean;
}

export class RepairSourceRegistrationDto {
  @IsString()
  @IsNotEmpty()
  sourceId!: string;

  @Matches(/^[A-Za-z][A-Za-z0-9_-]{0,62}$/, {
    message: "Name must start with a letter and contain only letters, numbers, underscores, or hyphens.",
  })
  name!: string;

  @IsIn(dataSourceProviders)
  provider!: DataSourceProvider;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ValidateComputeSourcesDto {
  @IsArray()
  @IsString({ each: true })
  sourceIds!: string[];
}

export class CreatePeriodDto {
  @ApiProperty({ example: "reporting" })
  @Matches(/^[a-z]{1,63}$/, {
    message: "Period name must contain only lowercase Latin letters, up to 63 characters.",
  })
  name!: string;

  @ApiProperty({ enum: periodUnits })
  @IsIn(periodUnits)
  unit!: (typeof periodUnits)[number];

  @ApiProperty({ type: [String], example: ["2024", "2025"] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  values!: string[];
}

export class CreateComputeDto {
  @ApiProperty({ example: "primary_sources" })
  @ValidateBy({
    name: "computeName",
    validator: {
      validate: (value: unknown) => !getComputeNameValidationError(value),
      defaultMessage: ({ value }) => getComputeNameValidationError(value) ?? "Invalid compute name.",
    },
  })
  name!: string;

  @ApiProperty({ example: "Sources grouped in this compute" })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  sourceIds!: string[];

  @ApiProperty({ example: "period-uuid" })
  @IsString()
  @IsNotEmpty()
  periodId!: string;

  @ApiProperty({ enum: ["period-value"], example: "period-value" })
  @IsIn(["period-value"])
  comparisonModelId!: "period-value";

  @ApiProperty({ example: 42 })
  @IsInt()
  @IsPositive()
  accountSessionId!: number;
}
