import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Districts } from './entities/districts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class DistrictsRepository {}
@Injectable()
export class DistrictsService extends BaseService<Districts, Repository<Districts>, IParams> {
  constructor(@InjectRepository(Districts) repository: Repository<Districts>) {
    super(repository);
  }
  async findManyDistrictActive(
    status = 1,
    relations?: string[] | string[],
    provinceId?: number,
  ): Promise<Districts[]> {
    const queryBuilder: SelectQueryBuilder<Districts> =
      this.repository.createQueryBuilder('entity');

    const query = queryBuilder;
    if (relations && relations?.length > 0) {
      relations.forEach((field: string) => {
        queryBuilder.leftJoinAndSelect(`entity.${field}`, field);
      });
    }
    if (status) {
      query.where(`entity.status = :status`, { status });
    }
    if (provinceId) {
      console.log(
        '🚀 ~ file: districts.service.ts:32 ~ DistrictsService ~ provinceId:',
        provinceId,
      );
      query.andWhere(`entity.provinceId = :provinceId`, { provinceId });
    }

    return query.getMany();
  }
}
