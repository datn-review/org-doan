import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Lessons } from './entities/lessons.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class LessonsRepository {}
@Injectable()
export class LessonsService extends BaseService<Lessons, Repository<Lessons>, IParams> {
  constructor(@InjectRepository(Lessons) repository: Repository<Lessons>) {
    super(repository);
  }
}
