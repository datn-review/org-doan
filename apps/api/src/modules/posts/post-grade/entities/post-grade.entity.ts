import { GradeLevel } from 'src/modules/grade-level/entities/grade-level.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from '../../entities/posts.entity';

@Entity({ name: 'post_grade' })
export class PostGrade extends EntityHelper {
  @PrimaryColumn()
  postId: number;
  @PrimaryColumn()
  gradeLevelId: number;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts: Posts;

  @ManyToOne(() => GradeLevel, {
    eager: true,
  })
  gradeLevel: GradeLevel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
