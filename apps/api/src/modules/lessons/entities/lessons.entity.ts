import { ApiProperty } from '@nestjs/swagger';
import { Collaboration } from 'src/modules/collaboration/entities/collaboration.entity';
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

@Entity({ name: 'lesson' })
export class Lessons extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Collaboration, {
    eager: true,
  })
  @Column({ type: Number })
  collaboration?: Collaboration | null;

  @Column({ type: String, nullable: true })
  location: string;

  @Column({ type: String, nullable: true })
  content: string;

  @Column({ type: Date, nullable: false })
  lessonStart?: Date | null;

  @Column({ type: Date, nullable: false })
  lessonEnd?: Date | null;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
