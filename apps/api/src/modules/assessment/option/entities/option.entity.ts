import { ApiProperty } from '@nestjs/swagger';
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
import { User } from '../../../../users/entities/user.entity';
import { Question } from '../../question/entities/question.entity';

@Entity({ name: 'option' })
export class Option extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, {
    eager: true,
  })
  question: Question | null;

  @Column({ type: String, default: 1 })
  content: string;

  @Column({ type: Boolean, default: false })
  isCorrect: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
