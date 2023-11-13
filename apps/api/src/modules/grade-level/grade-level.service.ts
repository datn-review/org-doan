import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { GradeLevel } from './entities/grade-level.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class GradeLevelRepository {}
@Injectable()
export class GradeLevelService extends BaseService<GradeLevel, Repository<GradeLevel>, IParams> {
  constructor(@InjectRepository(GradeLevel) repository: Repository<GradeLevel>) {
    super(repository);
  }
}
