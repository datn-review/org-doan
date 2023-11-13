import { Injectable } from '@nestjs/common';
import { BaseEntity, Repository, SelectQueryBuilder } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { IBaseService, IParams } from './i.base.service';

export interface IRelations {
  field: string;
  entity: string;
}
export interface IWhere {
  field: string;
  value: string | number | any;
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
  async findManyActive(
    status = 1,
    relations?: IRelations[] | string[],
    where?: IWhere[] | undefined,
  ): Promise<T[]> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    const query = queryBuilder;
    if (relations && relations?.length > 0) {
      relations.forEach((field: string | IRelations) => {
        if (typeof field === 'string') {
          queryBuilder.leftJoinAndSelect(`entity.${field}`, field);
        } else {
          queryBuilder.leftJoinAndSelect(
            field.field.includes('.') ? field.field : `entity.${field.field}`,
            field.entity,
          );
        }
      });
    }
    if (status) {
      query.where(`entity.status = :status`, { status });
    }

    if (where && where?.length > 0) {
      where?.forEach(({ field, value }) => {
        query.andWhere(`entity.${field} = :value`, { value });
      });
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
    where,
    or,
  }: TP & {
    fieldSearch?: any;
    status?: number | undefined;
    relations?: IRelations[] | string[];
    where?: IWhere[];
    or?: IWhere[][];
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
          queryBuilder.leftJoinAndSelect(
            field.field.includes('.') ? field.field : `entity.${field.field}`,
            field.entity,
          );
        }
      });
    }

    if (status) {
      query.where(`entity.status = :status`, { status });
    }
    if (where && where?.length > 0) {
      where?.forEach(({ field, value }) => {
        query.andWhere(`entity.${field} = :value`, { value });
      });
    }
    if (typeof fieldSearch === 'string' && fieldSearch !== '') {
      query.andWhere(`LOWER(entity.${fieldSearch}) LIKE :searchName`, {
        searchName: `%${searchName.toLowerCase()}%`,
      });
    }
    if (fieldSearch.length == 2) {
      query.andWhere(
        `(LOWER(entity.${fieldSearch[0]}) LIKE :searchName OR LOWER(entity.${fieldSearch[1]}) LIKE :searchName)`,
        {
          searchName: `%${searchName.toLowerCase()}%`,
        },
      );
    }

    if (or) {
      or?.forEach((data, key) => {
        let string = '';
        let values = {};
        data?.forEach(({ field, value }, index) => {
          const fieldString = field?.includes('.') ? field : `entity.${field}`;
          if (index !== 0) {
            string += ` OR ${fieldString} = :value_${key}_${index}`;
          } else {
            string += `${fieldString} = :value_${key}_${index}`;
          }
          values = { ...values, [`value_${key}_${index}`]: value };
        });
        console.log(string);

        query.andWhere(`(${string})`, { ...values });
      });
    }
    const data = await query
      .orderBy(`entity.${sortBy}`, direction)
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totals = await query.getCount();

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

  findOne(fields: any, relations?: IRelations[] | string[]): Promise<NullableType<T>> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    if (relations && relations?.length > 0) {
      relations.forEach((field: string | IRelations) => {
        if (typeof field === 'string') {
          queryBuilder.leftJoinAndSelect(`entity.${field}`, field);
        } else {
          queryBuilder.leftJoinAndSelect(
            field.field.includes('.') ? field.field : `entity.${field.field}`,
            field.entity,
          );
        }
      });
    }
    if (fields) {
      Object.entries(fields).forEach(([name, value]) => {
        queryBuilder.andWhere(`entity.${name} = :value`, { value });
      });
    }

    return queryBuilder.getOne();
  }
  findMany(fields: any, relations?: IRelations[] | string[]): Promise<NullableType<T[]>> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    if (relations && relations?.length > 0) {
      relations.forEach((field: string | IRelations) => {
        if (typeof field === 'string') {
          queryBuilder.leftJoinAndSelect(`entity.${field}`, field);
        } else {
          queryBuilder.leftJoinAndSelect(
            field.field.includes('.') ? field.field : `entity.${field.field}`,
            field.entity,
          );
        }
      });
    }
    if (fields) {
      Object.entries(fields).forEach(([name, value]) => {
        queryBuilder.andWhere(`entity.${name} = :value`, { value });
      });
    }

    return queryBuilder.getMany();
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
  async softDeleteMany(ids: any): Promise<void> {
    await this.repository.softRemove(ids);
  }
  async delete(ids: any): Promise<void> {
    await this.repository.delete(ids);
  }
  async createMany(data: any[]): Promise<any> {
    return this.repository.insert(data);
  }
}
