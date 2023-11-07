import { Posts } from 'src/modules/posts/entities/posts.entity';
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

@Entity({ name: 'registration' })
export class Registration extends EntityHelper {
  @PrimaryColumn()
  postsId: number;
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts: Posts;

  @Column({ type: Number, default: 3 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
