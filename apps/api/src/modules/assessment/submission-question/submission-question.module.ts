import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { SubmissionQuestion } from './entities/submission-question.entity';
import { SubmissionQuestionController } from './submission-question.controller';
import { SubmissionQuestionService } from './submission-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionQuestion])],
  controllers: [SubmissionQuestionController],
  providers: [IsExist, IsNotExist, SubmissionQuestionService],
  exports: [SubmissionQuestionService],
})
export class SubmissionQuestionModule {}
