import { ApiProperty } from '@nestjs/swagger';
import { Certifications } from 'src/modules/certifications/entities/certifications.entity';
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

@Entity({ name: 'tutor_certification' })
export class TutorCertification extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: Number, nullable: true })
  certificationId?: number;
  @ManyToOne(() => User, {
    eager: true,
  })
  tutor?: User | null;

  @ManyToOne(() => Certifications, {
    eager: true,
  })
  certification?: Certifications | null;

  @Column({ type: String, nullable: true })
  customerNameVN: string;

  @Column({ type: String, nullable: true })
  customerNameEN: string;

  @Column({ type: String, nullable: true })
  customerDesVI: string;
  @Column({ type: String, nullable: true })
  customerDesEN: string;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
