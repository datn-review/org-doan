import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { SubmissionQuestion } from './entities/submission-question.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class SubmissionQuestionRepository {}
@Injectable()
export class SubmissionQuestionService extends BaseService<
  SubmissionQuestion,
  Repository<SubmissionQuestion>,
  IParams
> {
  constructor(@InjectRepository(SubmissionQuestion) repository: Repository<SubmissionQuestion>) {
    super(repository);
  }
}
