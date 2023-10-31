import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { PostSubject } from './entities/post-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostSubjectRepository {}
@Injectable()
export class PostSubjectService extends BaseService<PostSubject, Repository<PostSubject>, IParams> {
  constructor(@InjectRepository(PostSubject) repository: Repository<PostSubject>) {
    super(repository);
  }
}
