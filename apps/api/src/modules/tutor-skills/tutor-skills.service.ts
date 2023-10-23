import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { TutorSkills } from './entities/tutor-skills.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TutorSkillsRepository {}
@Injectable()
export class TutorSkillsService extends BaseService<TutorSkills, Repository<TutorSkills>, IParams> {
  constructor(@InjectRepository(TutorSkills) repository: Repository<TutorSkills>) {
    super(repository);
  }
}
