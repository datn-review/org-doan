import { ApiProperty } from '@nestjs/swagger';
import { Collaboration } from 'src/modules/collaboration/entities/collaboration.entity';
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

@Entity({ name: 'feedback' })
export class Feedback extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Collaboration, {
    eager: true,
  })
  collaboration?: Collaboration | null;

  @ManyToOne(() => User, {
    eager: true,
  })
  student?: User | null;

  @Column({ type: Number, default: 3 })
  overallRating: number;

  @Column({ type: Number, default: 3 })
  interactionRating: number;

  @Column({ type: Number, default: 3 })
  qualityRatting: number;

  @Column({ type: Number, default: 3 })
  contentRatting: number;

  @Column({ type: Number, default: 3 })
  presentationRating: number;

  @Column({ type: String, default: 1 })
  comment: string;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
