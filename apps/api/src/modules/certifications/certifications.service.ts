import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Certifications } from './entities/certifications.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class CertificationsRepository {}
@Injectable()
export class CertificationsService extends BaseService<
  Certifications,
  Repository<Certifications>,
  IParams
> {
  constructor(@InjectRepository(Certifications) repository: Repository<Certifications>) {
    super(repository);
  }
}
