import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { BaseEntity, Repository, SelectQueryBuilder } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { IBaseService, IParams } from './i.base.service';

interface IRelations {
  field: string;
  entity: string;
}
@Injectable()
export class BaseService<T extends BaseEntity, R extends Repository<T>, TP extends IParams>
  implements IBaseService<TP, T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  async create(createDto: any): Promise<T[]> {
    return this.repository.save(this.repository.create(createDto));
  }
  async findManyActive(status = 1): Promise<T[]> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    const query = queryBuilder;
    if (status) {
      query.where(`entity.status = :status`, { status });
    }
    return query.getMany();
  }

  async findManyWithPagination({
    limit,
    page,
    searchName,
    sortBy,
    sortDirection,
    fieldSearch,
    status,
    relations,
  }: TP & {
    fieldSearch: any;
    status: number | undefined;
    relations?: IRelations[] | string[];
  }): Promise<{
    data: T[];
    totals: number;
  }> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    let direction: 'ASC' | 'DESC' | undefined;
    const sortDirectionUp = sortDirection.toUpperCase();
    if (sortDirectionUp && (sortDirectionUp === 'ASC' || sortDirectionUp === 'DESC')) {
      direction = sortDirectionUp;
    }
    const query = queryBuilder;
    if (relations && relations?.length > 0) {
      relations.forEach((field: string | IRelations) => {
        if (typeof field === 'string') {
          queryBuilder.leftJoinAndSelect(`entity.${field}`, field);
        } else {
          queryBuilder.leftJoinAndSelect(`entity.${field.field}`, field.entity);
        }
      });
    }

    if (typeof fieldSearch === 'string' && fieldSearch !== '') {
      query.where(`LOWER(entity.${fieldSearch}) LIKE :searchName`, {
        searchName: `%${searchName.toLowerCase()}%`,
      });
    }
    if (fieldSearch.length == 2) {
      query.where(
        `LOWER(entity.${fieldSearch[0]}) LIKE :searchName OR LOWER(entity.${fieldSearch[1]}) LIKE :searchName `,
        {
          searchName: `%${searchName.toLowerCase()}%`,
        },
      );
    }

    if (status) {
      if (fieldSearch == '') {
        query.where(`entity.status = :status`, { status });
      } else {
        query.andWhere(`entity.status = :status`, { status });
      }
    }
    const data = await query
      .orderBy(`entity.${sortBy}`, direction)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totals = await this.countAll({ fieldSearch, searchName });

    return { data, totals };
  }
  countAll({
    fieldSearch,
    searchName,
    status,
  }: {
    fieldSearch: string;
    [k: string]: any;
  }): Promise<number> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');
    const query = queryBuilder;

    if (typeof fieldSearch === 'string' && fieldSearch !== '') {
      query.where(`LOWER(entity.${fieldSearch}) LIKE :searchName`, {
        searchName: `%${searchName.toLowerCase()}%`,
      });
    }
    if (fieldSearch.length == 2) {
      query.where(
        `LOWER(entity.${fieldSearch[0]}) LIKE :searchName OR LOWER(entity.${fieldSearch[1]}) LIKE :searchName `,
        {
          searchName: `%${searchName.toLowerCase()}%`,
        },
      );
    }
    if (status) {
      if (fieldSearch == '') {
        query.where(`entity.status = :status`, { status });
      } else {
        query.andWhere(`entity.status = :status`, { status });
      }
    }
    return query.getCount();
  }

  findOne(fields: EntityCondition<T>): Promise<NullableType<T>> {
    return this.repository.findOne({
      where: fields,
    });
  }

  async update(id: number, payload: any): Promise<T[]> {
    return this.repository.save(
      this.repository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
