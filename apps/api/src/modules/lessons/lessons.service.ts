import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Lessons } from './entities/lessons.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class LessonsRepository {}
@Injectable()
export class LessonsService extends BaseService<Lessons, Repository<Lessons>, IParams> {
  constructor(@InjectRepository(Lessons) repository: Repository<Lessons>) {
    super(repository);
  }
  async findDay(dayStart?: string, dayEnd?: string, userId?: number): Promise<any> {
    if (!dayStart) return null;
    const start = new Date(dayStart);
    start.setHours(0, 0, 0, 0);

    let end = new Date(dayStart);
    end.setDate(start.getDate());
    end.setHours(23, 59, 59, 59.99);
    if (dayEnd) {
      end = new Date(dayEnd);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 59.99);
    }

    const data = await this.repository
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.collaboration', 'collaboration')
      .leftJoinAndSelect('collaboration.posts', 'posts')
      .leftJoinAndSelect('posts.user', 'user')
      .where('(entity.lessonStart BETWEEN :startDate AND :endDate)', {
        startDate: start.toLocaleString(),
        endDate: end.toLocaleString(),
      })
      .andWhere(`user.id = :userId`, { userId })
      .getMany();
    const string = `${start.toLocaleDateString()}${dayEnd ? ` - ${end.toLocaleDateString()}` : ''}`;

    return { data, string };
  }

  async findToDayAll(): Promise<any> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(start.getDate());
    end.setHours(23, 59, 59, 59.99);

    const data = await this.repository
      .createQueryBuilder('entity')
      .leftJoinAndSelect('entity.collaboration', 'collaboration')
      .leftJoinAndSelect('collaboration.posts', 'posts')
      .leftJoinAndSelect('posts.user', 'user')
      .where('(entity.lessonStart BETWEEN :startDate AND :endDate)', {
        startDate: start.toLocaleString(),
        endDate: end.toLocaleString(),
      })
      .getMany();

    return { data };
  }
}
