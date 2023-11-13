import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Collaboration } from './entities/collaboration.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CollaborationRepository {}
@Injectable()
export class CollaborationService extends BaseService<
  Collaboration,
  Repository<Collaboration>,
  IParams
> {
  constructor(@InjectRepository(Collaboration) repository: Repository<Collaboration>) {
    super(repository);
  }
}
