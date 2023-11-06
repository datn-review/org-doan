import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class RegistrationRepository {}
@Injectable()
export class RegistrationService extends BaseService<
  Registration,
  Repository<Registration>,
  IParams
> {
  constructor(@InjectRepository(Registration) repository: Repository<Registration>) {
    super(repository);
  }
}
