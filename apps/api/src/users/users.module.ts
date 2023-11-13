import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorCertificationModule } from 'src/modules/tutor-certification/tutor-certification.module';
import { TutorSkillsModule } from 'src/modules/tutor-skills/tutor-skills.module';
import { TutorSubjectGradeModule } from 'src/modules/tutor-subject-grade/tutor-subject-grade.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { FilesModule } from './../files-drive/files.module';
import { UsersAdminController, UsersTutorController, UsersStudentController } from './controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TutorTimeAvailabilityModule } from './tutor-time-availability/tutor-time-availability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FilesModule,
    TutorCertificationModule,
    TutorSkillsModule,
    TutorSubjectGradeModule,
    TutorTimeAvailabilityModule,
  ],
  controllers: [UsersAdminController, UsersTutorController, UsersStudentController],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
