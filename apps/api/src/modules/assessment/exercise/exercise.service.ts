import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ExerciseRepository {}
@Injectable()
export class ExerciseService extends BaseService<Exercise, Repository<Exercise>, IParams> {
  constructor(@InjectRepository(Exercise) repository: Repository<Exercise>) {
    super(repository);
  }
}
