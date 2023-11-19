import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collaboration } from '../../collaboration/entities/collaboration.entity';

@Entity({ name: 'schedule' })
export class Schedule extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Collaboration, {
    eager: true,
  })
  @Column({ type: Number })
  collaboration?: Collaboration | null;

  @Column({ type: Number, nullable: false })
  dayOfWeek: string;

  @Column({ type: String, nullable: false })
  timeStart: string;

  @Column({ type: String, nullable: false })
  timeEnd: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
