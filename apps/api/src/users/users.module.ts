import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorCertificationModule } from 'src/modules/tutor-certification/tutor-certification.module';
import { TutorSkillsModule } from 'src/modules/tutor-skills/tutor-skills.module';
import { TutorSubjectGradeModule } from 'src/modules/tutor-subject-grade/tutor-subject-grade.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { FilesModule } from './../files-drive/files.module';
import {
  UsersAdminController,
  UsersTutorController,
  UsersStudentController,
  UsersController,
} from './controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TutorTimeAvailabilityModule } from './tutor-time-availability/tutor-time-availability.module';
import { UsersStaffController } from './controller/users.staff.controller';
import { UsersParentController } from './controller/users.parent.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FilesModule,
    TutorCertificationModule,
    TutorSkillsModule,
    TutorSubjectGradeModule,
    TutorTimeAvailabilityModule,
  ],
  controllers: [
    UsersAdminController,
    UsersTutorController,
    UsersStudentController,
    UsersController,
    UsersStaffController,
    UsersParentController,
  ],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
