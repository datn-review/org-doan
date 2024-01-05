import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Assignment } from './entities/assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { SubmissionQuestionModule } from '../submission-question/submission-question.module';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';
import { LessonsModule } from 'src/modules/lessons/lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment]),
    SubmissionQuestionModule,
    NotificationsModule,
    LessonsModule,
  ],
  controllers: [AssignmentController],
  providers: [IsExist, IsNotExist, AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
