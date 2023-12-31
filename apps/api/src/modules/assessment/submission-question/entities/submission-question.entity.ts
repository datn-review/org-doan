import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assignment } from '../../assignment/entities/assignment.entity';
import { Question } from '../../question/entities/question.entity';

@Entity({ name: 'submission_question' })
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
  answer: string;

  @Column({ type: Boolean, nullable: true })
  isCorrect: boolean;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
