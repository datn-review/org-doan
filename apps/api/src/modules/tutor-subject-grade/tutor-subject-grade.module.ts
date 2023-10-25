import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TutorSubjectGrade } from './entities/tutor-subject-grade.entity';
import { TutorSubjectGradeController } from './tutor-subject-grade.controller';
import { TutorSubjectGradeService } from './tutor-subject-grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([TutorSubjectGrade])],
  controllers: [TutorSubjectGradeController],
  providers: [IsExist, IsNotExist, TutorSubjectGradeService],
  exports: [TutorSubjectGradeService],
})
export class TutorSubjectGradeModule {}
