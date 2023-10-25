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

@Entity({ name: 'student_subject' })
export class StudentSubject extends EntityHelper {
  @PrimaryColumn()
  studentId: number;

  @PrimaryColumn()
  subjectId: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  student: User;

  @ManyToOne(() => Subject, {
    eager: true,
  })
  subject: Subject;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
