import { ApiProperty } from '@nestjs/swagger';
import { Wards } from 'src/modules/provinces/wards/entities/wards.entity';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
