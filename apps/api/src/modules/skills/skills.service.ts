import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Skills } from './entities/skills.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class SkillsRepository {}
@Injectable()
export class SkillsService extends BaseService<Skills, Repository<Skills>, IParams> {
  constructor(@InjectRepository(Skills) repository: Repository<Skills>) {
    super(repository);
  }
}
