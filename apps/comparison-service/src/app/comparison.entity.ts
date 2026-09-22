import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { EntityId } from '@cui/network/providers';
import { Column, CreateDateColumn, Entity, Index, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'comparisons' })
export class Comparison {
  @ObjectIdColumn()
  @ApiProperty({ type: String })
  id!: EntityId;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  pairKey!: string;

  @Column()
  @ApiProperty()
  leftEntity!: string;

  @Column()
  @ApiProperty()
  rightEntity!: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ nullable: true })
  r!: number | null;

  @Column()
  @ApiProperty()
  observationCount!: number;

  @Column()
  @ApiProperty({ type: [Number] })
  years!: number[];

  @Column()
  @ApiProperty({ type: [Number] })
  leftValues!: number[];

  @Column()
  @ApiProperty({ type: [Number] })
  rightValues!: number[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt!: Date;
}
