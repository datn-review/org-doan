import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { CollaborationSubject } from './entities/collaboration-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CollaborationSubjectRepository {}
@Injectable()
export class CollaborationSubjectService extends BaseService<
  CollaborationSubject,
  Repository<CollaborationSubject>,
  IParams
> {
  constructor(
    @InjectRepository(CollaborationSubject) repository: Repository<CollaborationSubject>,
  ) {
    super(repository);
  }
}
