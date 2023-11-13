import { useState } from 'react';
import usePagination from './usePagination';
import useSortTable from './useSortTable';
import { ISortParams, type IDirection } from './useSortTable';

interface TableHookAPI {
  initialSortValue?: ISortParams;
  initialLimit?: number;
}

export function useTable({ initialSortValue, initialLimit = 10 }: TableHookAPI) {
  const { currentPage, onChangePage } = usePagination();
  const { onSort, sortBy, sortDirection } = useSortTable(initialSortValue);

  const [limit, setLimit] = useState(initialLimit);

  const onChangeLimit = (value: number) => {
    setLimit(value);
    onChangePage(1);
  };

  const pagination = { currentPage };
  const sort = { sortBy, sortDirection };
  const values = { pagination, sort };

  const convertOrder: Record<IDirection, string> = {
    asc: 'ascend',
    desc: 'descend',
    '': '',
  };
  const reset = () => {
    onChangePage(1);
    initialSortValue &&
      onSort({
        order: convertOrder[initialSortValue.sortDirection],
        field: initialSortValue?.sortBy,
      });
  };
  const table = {
    onChangePage,
    onChangeLimit,
    onSort,
    values,
    reset,
    limit,
  };

  return table;
}
