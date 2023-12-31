import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResultType } from './types/infinity-pagination-result.type';

export const infinityPagination = <T>(
  data: T[],
  totals: number,
  options: IPaginationOptions,
): InfinityPaginationResultType<T> => {
  return {
    data,
    totals: totals,
    hasNextPage: data.length === options.limit,
  };
};
