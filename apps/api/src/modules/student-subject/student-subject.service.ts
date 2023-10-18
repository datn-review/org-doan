import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { StudentSubject } from './entities/student-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class StudentSubjectRepository {}
@Injectable()
export class StudentSubjectService extends BaseService<
  StudentSubject,
  Repository<StudentSubject>,
  IParams
> {
  constructor(@InjectRepository(StudentSubject) repository: Repository<StudentSubject>) {
    super(repository);
  }
}
