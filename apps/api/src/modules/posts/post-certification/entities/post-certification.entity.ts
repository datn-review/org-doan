import { Certifications } from 'src/modules/certifications/entities/certifications.entity';
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

@Entity({ name: 'post_certification' })
export class PostCertification extends EntityHelper {
  @PrimaryColumn()
  postId: number;
  @PrimaryColumn()
  certificationsId: number;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts: Posts;

  @ManyToOne(() => Certifications, {
    eager: true,
  })
  certifications: Certifications;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
