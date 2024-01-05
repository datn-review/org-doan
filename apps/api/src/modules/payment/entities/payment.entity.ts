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

@Entity({ name: 'payment' })
export class Payment extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  sender?: User | null;

  @ManyToOne(() => User, {
    eager: true,
  })
  receiver?: User | null;

  @ManyToOne(() => Collaboration, {
    eager: true,
  })
  collaboration?: Collaboration | null;

  @Column({ type: Date, nullable: true })
  feeMonthDate?: Date | null;

  @Column({ type: Number })
  amount?: number;

  @Column({ type: String, nullable: true })
  payRef?: string;

  @Column({ type: Number, default: 1 })
  type: number;

  @Column({ type: Date, nullable: true })
  paymentDate?: Date | null;

  @Column({ type: Date, nullable: true })
  deadPaymentDate?: Date | null;
  @Column({ type: Number, nullable: true })
  profits?: number;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
