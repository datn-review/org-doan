import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { PostSkills } from './entities/post-skills.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PostSkillsRepository {}
@Injectable()
export class PostSkillsService extends BaseService<PostSkills, Repository<PostSkills>, IParams> {
  constructor(@InjectRepository(PostSkills) repository: Repository<PostSkills>) {
    super(repository);
  }
}
