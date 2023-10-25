import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class SubjectRepository {}
@Injectable()
export class SubjectService extends BaseService<Subject, Repository<Subject>, IParams> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }
}
