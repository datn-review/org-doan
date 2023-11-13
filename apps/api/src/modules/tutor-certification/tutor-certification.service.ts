import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { TutorCertification } from './entities/tutor-certification.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TutorCertificationRepository {}
@Injectable()
export class TutorCertificationService extends BaseService<
  TutorCertification,
  Repository<TutorCertification>,
  IParams
> {
  constructor(@InjectRepository(TutorCertification) repository: Repository<TutorCertification>) {
    super(repository);
  }
}
