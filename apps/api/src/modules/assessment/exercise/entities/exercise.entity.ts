import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from '../../../subject/entities/subject.entity';
import { Question } from '../../question/entities/question.entity';
import { User } from '../../../../users/entities/user.entity';
import { GradeLevel } from 'src/modules/grade-level/entities/grade-level.entity';

@Entity({ name: 'exercise' })
export class Exercise extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  name: string;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];

  @ManyToOne(() => User, {
    eager: true,
  })
  author: User | null;

  @ManyToOne(() => GradeLevel, {
    eager: true,
  })
  gradeLevel: GradeLevel | null;

  @ManyToOne(() => Subject, {
    eager: true,
  })
  subject: Subject | null;

  @Column({ type: Boolean, default: true })
  isPublish: boolean;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
