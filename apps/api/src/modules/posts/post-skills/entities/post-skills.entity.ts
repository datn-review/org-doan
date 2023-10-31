import { Skills } from 'src/modules/skills/entities/skills.entity';
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

@Entity({ name: 'post_skills' })
export class PostSkills extends EntityHelper {
  @PrimaryColumn()
  postId: number;
  @PrimaryColumn()
  skillsId: number;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts: Posts;

  @ManyToOne(() => Skills, {
    eager: true,
  })
  skills: Skills;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
