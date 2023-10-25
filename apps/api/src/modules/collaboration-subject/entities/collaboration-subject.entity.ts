import { Subject } from 'src/modules/subject/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'collaboration_subject' })
export class CollaborationSubject extends EntityHelper {
  @PrimaryColumn()
  tutorId: number;
  @PrimaryColumn()
  subjectId: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  tutor: User;

  @ManyToOne(() => Subject, {
    eager: true,
  })
  subject: Subject;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
