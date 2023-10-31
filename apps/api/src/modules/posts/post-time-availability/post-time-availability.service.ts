import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { PostTimeAvailability } from './entities/post-time-availability.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostTimeAvailabilityRepository {}
@Injectable()
export class PostTimeAvailabilityService extends BaseService<
  PostTimeAvailability,
  Repository<PostTimeAvailability>,
  IParams
> {
  constructor(
    @InjectRepository(PostTimeAvailability) repository: Repository<PostTimeAvailability>,
  ) {
    super(repository);
  }
}
