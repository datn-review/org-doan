import { Subject } from 'src/modules/subject/entities/subject.entity';
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
import { Posts } from '../../entities/posts.entity';

@Entity({ name: 'post_subject' })
export class PostSubject extends EntityHelper {
  @PrimaryColumn()
  postId: number;
  @PrimaryColumn()
  skillsId: number;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts: Posts;

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
