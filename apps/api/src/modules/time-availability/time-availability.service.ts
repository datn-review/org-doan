import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { TimeAvailability } from './entities/time-availability.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TimeAvailabilityRepository {}
@Injectable()
export class TimeAvailabilityService extends BaseService<
  TimeAvailability,
  Repository<TimeAvailability>,
  IParams
> {
  constructor(@InjectRepository(TimeAvailability) repository: Repository<TimeAvailability>) {
    super(repository);
  }
}
