import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class FeedbackRepository {}
@Injectable()
export class FeedbackService extends BaseService<Feedback, Repository<Feedback>, IParams> {
  constructor(@InjectRepository(Feedback) repository: Repository<Feedback>) {
    super(repository);
  }
}
