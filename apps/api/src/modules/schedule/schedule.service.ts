import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ScheduleRepository {}
@Injectable()
export class ScheduleService extends BaseService<Schedule, Repository<Schedule>, IParams> {
  constructor(@InjectRepository(Schedule) repository: Repository<Schedule>) {
    super(repository);
  }
}
