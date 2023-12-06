import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Exercise } from './entities/exercise.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { QuestionModule } from '../question/question.module';
import { OptionModule } from '../option/option.module';
import { SubjectModule } from 'src/modules/subject/subject.module';
import { GradeLevelModule } from 'src/modules/grade-level/grade-level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise]),
    QuestionModule,
    OptionModule,
    SubjectModule,
    GradeLevelModule,
  ],
  controllers: [ExerciseController],
  providers: [IsExist, IsNotExist, ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
