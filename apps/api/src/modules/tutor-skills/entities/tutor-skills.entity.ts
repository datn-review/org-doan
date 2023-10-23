import { ApiProperty } from '@nestjs/swagger';
import { Skills } from 'src/modules/skills/entities/skills.entity';
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

@Entity({ name: 'tutor_skills' })
export class TutorSkills extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  tutor?: User | null;

  @ManyToOne(() => Skills, {
    eager: true,
  })
  skills?: Skills | null;

  @Column({ type: String, nullable: true })
  customerName_VN: string;

  @Column({ type: String, nullable: true })
  customerName_EN: string;

  @Column({ type: String, nullable: true })
  customerDes_VI: string;
  @Column({ type: String, nullable: true })
  customerDes_EN: string;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
