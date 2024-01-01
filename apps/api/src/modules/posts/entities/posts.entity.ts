import { ApiProperty } from '@nestjs/swagger';
import { Certifications } from 'src/modules/certifications/entities/certifications.entity';
import { GradeLevel } from 'src/modules/grade-level/entities/grade-level.entity';
import { Wards } from 'src/modules/provinces/wards/entities/wards.entity';
import { Skills } from 'src/modules/skills/entities/skills.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';

import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostTimeAvailability } from '../post-time-availability/entities/post-time-availability.entity';
import { Collaboration } from 'src/modules/collaboration/entities/collaboration.entity';

@Entity({ name: 'posts' })
export class Posts extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  requestSummaryVI: string;

  @Column({ type: String, nullable: true })
  requestSummaryEN?: string;

  @Column({ type: String, nullable: false })
  requestDetailVI: string;

  @Column({ type: String, nullable: true })
  requestDetailEN?: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  user?: User | null;

  @Column({ type: String, nullable: true })
  address?: string;
  @ManyToOne(() => Wards, {
    eager: true,
  })
  wards?: Wards | null;

  // số giờ dạy tên 1 buổi
  @Column({ type: Number, nullable: false })
  timeDay: Date;

  // phí
  @Column({ type: Number, nullable: false })
  fee: number;

  // phí theo tháng/tuần/day
  @Column({ type: Number, nullable: false })
  perTime: number;

  // số ngày dạy trên tuần
  @Column({ type: Number, nullable: false })
  dayWeek: number;

  @Column({ type: Date, nullable: false })
  timeStart: Date;
  @Column({ type: Number, nullable: false })
  type: number;
  @Column({ type: Number, default: 1 })
  status: number;

  @OneToMany(() => PostTimeAvailability, (postTimeAvailability) => postTimeAvailability.posts, {
    onDelete: 'CASCADE',
  })
  postTimeAvailability: PostTimeAvailability[];

  @OneToMany(() => Collaboration, (Collaboration) => Collaboration.posts,{
    onDelete: 'CASCADE',
  })
  collaboration: Collaboration[];

  @ManyToMany(() => Skills)
  @JoinTable()
  skills: Skills[];

  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  @ManyToMany(() => GradeLevel)
  @JoinTable()
  gradeLevels: GradeLevel[];

  @ManyToMany(() => Certifications)
  @JoinTable()
  certifications: Certifications[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
