import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class QuestionRepository {}
@Injectable()
export class QuestionService extends BaseService<Question, Repository<Question>, IParams> {
  constructor(@InjectRepository(Question) repository: Repository<Question>) {
    super(repository);
  }
}
