import { NullableType } from 'src/utils/types/nullable.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';

export interface IParams {
  page: number;
  limit: number;
  searchName: string;
  sortDirection: string;
  sortBy: string;
  fieldSearch: any;
  status: number | undefined;
}

export interface IBaseService<TParams extends IParams, T> {
  findOne(fields: EntityCondition<T>): Promise<NullableType<T>>;

  findManyWithPagination(params: TParams): Promise<any>;

  countAll(params: any): Promise<number>;

  findManyActive(status: number): Promise<T[]>;

  create(data: any): Promise<T[]>;

  update(id: number, payload: any): Promise<T[]>;

  softDelete(id: number): Promise<void>;
}
