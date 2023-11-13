import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Wards } from './entities/wards.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class WardsRepository {}
@Injectable()
export class WardsService extends BaseService<Wards, Repository<Wards>, IParams> {
  constructor(@InjectRepository(Wards) repository: Repository<Wards>) {
    super(repository);
  }
  async findManyWardActive(
    status = 1,
    relations?: string[] | string[],
    districtsId?: number,
  ): Promise<Wards[]> {
    const queryBuilder: SelectQueryBuilder<Wards> = this.repository.createQueryBuilder('entity');

    const query = queryBuilder;
    if (relations && relations?.length > 0) {
      relations.forEach((field: string) => {
        queryBuilder.leftJoinAndSelect(`entity.${field}`, field);
      });
    }
    if (status) {
      query.where(`entity.status = :status`, { status });
    }
    console.log('🚀 ~ file: wards.service.ts:31 ~ WardsService ~ districtsId:', districtsId);
    if (districtsId) {
      query.andWhere(`entity.districtsId = :districtsId`, { districtsId });
    }

    return query.getMany();
  }
}
