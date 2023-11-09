import { ApiProperty } from '@nestjs/swagger';
import { Posts } from 'src/modules/posts/entities/posts.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'collaboration' })
export class Collaboration extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  tutor?: User | null;

  @ManyToOne(() => User, {
    eager: true,
  })
  student?: User | null;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts?: Posts | null;

  @Column({ type: String, nullable: true })
  studentSignature?: string | null;

  @Column({ type: String, nullable: true })
  tutorSignature?: string | null;

  @Column({ type: Date, nullable: true })
  startDate: Date;

  @Column({ type: Date, nullable: true })
  endDate: Date;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
