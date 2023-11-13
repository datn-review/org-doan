import { GradeLevel } from 'src/modules/grade-level/entities/grade-level.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
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

@Entity({ name: 'tutor_subject_grade' })
export class TutorSubjectGrade extends EntityHelper {
  @PrimaryColumn()
  tutorId: number;
  @PrimaryColumn()
  subjectId: number;
  @PrimaryColumn()
  gradeId: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  tutor: User;

  @ManyToOne(() => Subject, {
    eager: true,
  })
  subject: Subject;

  @ManyToOne(() => GradeLevel, {
    eager: true,
  })
  grade: GradeLevel;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
