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

@Entity({ name: 'post_time_availability' })
export class PostTimeAvailability extends EntityHelper {
  @PrimaryColumn()
  postId: number;
  @PrimaryColumn()
  dayofWeek: number;
  @PrimaryColumn()
  hour: number;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts: Posts;

  @CreateDateColumn()
  createdAt: Date;
  z;
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
