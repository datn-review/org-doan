import { ApiProperty } from '@nestjs/swagger';
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

@Entity({ name: 'posts' })
export class Posts extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  title_VI: string;

  @Column({ type: String, nullable: false })
  title_EN: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  user?: User | null;

  @Column({ type: String, nullable: false })
  content_VI: string;
  @Column({ type: String, nullable: false })
  content_EN: string;

  @Column({ type: Number, nullable: false })
  type: number;
  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
