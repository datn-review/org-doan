import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorCertificationModule } from 'src/modules/tutor-certification/tutor-certification.module';
import { TutorSkillsModule } from 'src/modules/tutor-skills/tutor-skills.module';
import { TutorSubjectGradeModule } from 'src/modules/tutor-subject-grade/tutor-subject-grade.module';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { FilesModule } from './../files-drive/files.module';
import { UsersAdminController, UsersTutorController } from './controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FilesModule,
    TutorCertificationModule,
    TutorSkillsModule,
    TutorSubjectGradeModule,
  ],
  controllers: [UsersAdminController, UsersTutorController],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
