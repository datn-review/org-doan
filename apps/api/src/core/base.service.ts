import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { BaseEntity, Repository, SelectQueryBuilder } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { IBaseService, IParams } from './i.base.service';

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

  async findManyWithPagination({
    limit,
    page,
    searchName,
    sortBy,
    sortDirection,
    fieldSearch,
    status,
  }: TP & { fieldSearch: any; status: number | undefined }): Promise<{
    data: T[];
    totals: number;
  }> {
    const queryBuilder: SelectQueryBuilder<T> = this.repository.createQueryBuilder('entity');

    let direction: 'ASC' | 'DESC' | undefined;
    const sortDirectionUp = sortDirection.toUpperCase();
    if (sortDirectionUp && (sortDirectionUp === 'ASC' || sortDirectionUp === 'DESC')) {
      direction = sortDirectionUp;
    }
    const query = queryBuilder.where(`entity.${fieldSearch} LIKE :searchName`, {
      searchName: `%${searchName}%`,
    });
    if (status) {
      query.andWhere(`entity.status = :status`, { status });
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

    const query = queryBuilder.where(`entity.${fieldSearch} LIKE :searchName`, {
      searchName: `%${searchName}%`,
    });
    if (status) {
      query.andWhere(`entity.status = :status`, { status });
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
