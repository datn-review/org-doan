import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { PostGrade } from './entities/post-grade.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostGradeRepository {}
@Injectable()
export class PostGradeService extends BaseService<PostGrade, Repository<PostGrade>, IParams> {
  constructor(@InjectRepository(PostGrade) repository: Repository<PostGrade>) {
    super(repository);
  }
}
