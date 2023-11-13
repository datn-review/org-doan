import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { TutorTimeAvailability } from './entities/tutor-time-availability.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TutorTimeAvailabilityRepository {}
@Injectable()
export class TutorTimeAvailabilityService extends BaseService<
  TutorTimeAvailability,
  Repository<TutorTimeAvailability>,
  IParams
> {
  constructor(
    @InjectRepository(TutorTimeAvailability) repository: Repository<TutorTimeAvailability>,
  ) {
    super(repository);
  }
}
