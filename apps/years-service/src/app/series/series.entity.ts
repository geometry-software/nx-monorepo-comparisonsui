import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import type { EntityId } from "@cui/network/providers";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "observations" })
export class SeriesObservation {
  @ObjectIdColumn()
  @ApiProperty({ type: String })
  id!: EntityId;

  @Column()
  @Index({ unique: true })
  @ApiProperty({ minimum: 1900, maximum: 2200 })
  year!: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  value?: number;

  @CreateDateColumn()
  @ApiProperty()
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt!: Date;
}
