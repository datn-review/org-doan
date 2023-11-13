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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../../payment/entities/payment.entity';
import { TutorCertification } from '../../tutor-certification/entities/tutor-certification.entity';

@Entity({ name: 'collaboration' })
export class Collaboration extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  user?: User | null;

  @ManyToOne(() => Posts, {
    eager: true,
  })
  posts?: Posts | null;

  @OneToMany(() => Payment, (payment) => payment.collaboration, {
    onDelete: 'CASCADE',
  })
  payment?: Payment[] | null;

  @Column({ type: String, nullable: true })
  studentSignature?: string | null;

  @Column({ type: String, nullable: true })
  tutorSignature?: string | null;

  @Column({ type: Date, nullable: true })
  contractStartDate: Date;

  @Column({ type: Date, nullable: true })
  contractEndDate: Date;

  @Column({ type: String, nullable: true })
  contractTerms: string;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
