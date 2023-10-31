import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { PostCertification } from './entities/post-certification.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostCertificationRepository {}
@Injectable()
export class PostCertificationService extends BaseService<
  PostCertification,
  Repository<PostCertification>,
  IParams
> {
  constructor(@InjectRepository(PostCertification) repository: Repository<PostCertification>) {
    super(repository);
  }
}
