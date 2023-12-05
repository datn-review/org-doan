import { ApiProperty } from '@nestjs/swagger';
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
import { GradeLevel } from '../../../grade-level/entities/grade-level.entity';
import { Subject } from '../../../subject/entities/subject.entity';
import { Option } from '../../option/entities/option.entity';
import { User } from '../../../../users/entities/user.entity';
@Entity({ name: 'question' })
export class Question extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number, nullable: false })
  gradeLevelId: number;

  @Column({ type: Number, nullable: false })
  subjectId: number;

  @Column({ type: String, nullable: false })
  content: string;

  @OneToMany(() => Option, (option) => option.question, {
    onDelete: 'CASCADE',
  })
  options?: Option[] | null;

  @ManyToOne(() => GradeLevel, {
    eager: true,
  })
  gradeLevel: Question | null;

  @ManyToOne(() => Subject, {
    eager: true,
  })
  subject: Subject | null;

  @Column({ type: Number, default: 1 })
  type: number;

  @Column({ type: Number, default: 1 })
  level: number;

  @Column({ type: Number, default: 1 })
  score: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  author: User | null;

  @Column({ type: Boolean, default: true })
  isPublish?: boolean;

  @Column({ type: Number, default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
