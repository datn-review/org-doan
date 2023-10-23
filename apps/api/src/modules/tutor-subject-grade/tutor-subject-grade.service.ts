import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { TutorSubjectGrade } from './entities/tutor-subject-grade.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TutorSubjectGradeRepository {}
@Injectable()
export class TutorSubjectGradeService extends BaseService<
  TutorSubjectGrade,
  Repository<TutorSubjectGrade>,
  IParams
> {
  constructor(@InjectRepository(TutorSubjectGrade) repository: Repository<TutorSubjectGrade>) {
    super(repository);
  }
}
