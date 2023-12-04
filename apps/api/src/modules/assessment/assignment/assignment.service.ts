import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class AssignmentRepository {}
@Injectable()
export class AssignmentService extends BaseService<Assignment, Repository<Assignment>, IParams> {
  constructor(@InjectRepository(Assignment) repository: Repository<Assignment>) {
    super(repository);
  }
  findAssignmentByCollap(userId: number) {
    return this.repository
      .createQueryBuilder('assignment')
      .leftJoinAndSelect('assignment.lesson', 'lesson')
      .leftJoinAndSelect('lesson.collaboration', 'collaboration')
      .where('collaboration.id = :userId', { userId })
      .getMany();
  }
}
