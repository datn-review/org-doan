import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { TutorCertification } from 'src/modules/tutor-certification/entities/tutor-certification.entity';
import { TutorSkills } from 'src/modules/tutor-skills/entities/tutor-skills.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity } from '../../files/entities/file.entity';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { TutorSubjectGrade } from 'src/modules/tutor-subject-grade/entities/tutor-subject-grade.entity';
import { TutorTimeAvailability } from '../tutor-time-availability/entities/tutor-time-availability.entity';
import { Wards } from 'src/modules/provinces/wards/entities/wards.entity';
import { Room } from 'src/modules/chat/room/entities/room.entity';
import { Collaboration } from 'src/modules/collaboration/entities/collaboration.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null | string;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @Column({ type: String, nullable: true })
  address?: string;
  @ManyToOne(() => Wards, {
    eager: true,
  })
  wards?: Wards | null;

  @OneToMany(() => TutorSkills, (tutorSkills) => tutorSkills.tutor, {
    onDelete: 'CASCADE',
  })
  tutorSkills: TutorSkills[];

  @OneToMany(() => TutorCertification, (tutorCertification) => tutorCertification.tutor, {
    onDelete: 'CASCADE',
  })
  tutorCertifications: TutorCertification[];

  @OneToMany(() => TutorSubjectGrade, (tutorSubjectGrade) => tutorSubjectGrade.tutor, {
    onDelete: 'CASCADE',
  })
  tutorGradeSubject: TutorSubjectGrade[];
  @OneToMany(() => TutorTimeAvailability, (tutorTimeAvailability) => tutorTimeAvailability.tutor, {
    onDelete: 'CASCADE',
  })
  tutorTimeAvailability: TutorTimeAvailability[];

  @OneToMany(() => Room, (room) => room.owner)
  rooms: Room[];

  @OneToMany(() => Collaboration, (collaboration) => collaboration.user)
  collaboration: Collaboration[];

  @ManyToMany(() => Room, (room) => room.members)
  joinedRooms: Room[];

  @Column({ type: String, nullable: true })
  phone: string | null;

  @Column({ type: String, nullable: true })
  bio: string | null;

  @Expose({ groups: ['me', 'admin'] })
  @Column({ type: String, nullable: true })
  accountNumberBank: string | null;

  @Expose({ groups: ['me', 'admin'] })
  @Column({ type: String, nullable: true })
  nameBank: string | null;

  @Expose({ groups: ['me', 'admin'] })
  @Column({ type: String, nullable: true })
  ownerBank: string | null;

  @Column({ type: String, nullable: true })
  school: string | null;

  @Column({ type: Date, nullable: true })
  birthday: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
