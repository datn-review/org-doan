import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../../users/entities/user.entity';
import { Subject } from '../../../subject/entities/subject.entity';
import { Assignment } from '../../assignment/entities/assignment.entity';
import { Question } from '../../question/entities/question.entity';

@Entity({ name: 'submissionQuestion' })
export class SubmissionQuestion extends EntityHelper {
  @PrimaryColumn()
  assignmentId: number;
  @PrimaryColumn()
  questionId: number;

  @ManyToOne(() => Assignment, {
    eager: true,
  })
  assignment: Assignment;

  @ManyToOne(() => Question, {
    eager: true,
  })
  question: Question;

  @Column({ type: String, nullable: false })
  answer: String;

  @Column({ type: Boolean, nullable: true })
  isCorrect: Boolean;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
