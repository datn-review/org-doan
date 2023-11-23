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
import { GradeLevel } from '../../../grade-level/entities/grade-level.entity';
import { Lessons } from '../../../lessons/entities/lessons.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';

@Entity({ name: 'assignment' })
export class Assignment extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  title: string;

  @ManyToOne(() => Lessons, {
    eager: true,
  })
  lesson: Lessons | null;

  @ManyToOne(() => Exercise, {
    eager: true,
  })
  exercise: Exercise | null;

  @Column({ type: String, nullable: true })
  score?: string | null;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  startTime: Date;

  @CreateDateColumn()
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
