import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ExportInsightPdfDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsIn(['mongodb', 'bump'])
  provider!: 'mongodb' | 'bump';

  @IsDateString()
  createdAt!: string;
}
