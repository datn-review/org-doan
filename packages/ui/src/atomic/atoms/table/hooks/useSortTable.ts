import { useState } from 'react';

export type IDirection = 'asc' | 'desc' | '';

export interface ISortParams {
  sortBy: string;
  sortDirection: IDirection;
}

const defaultSortDirection: IDirection = '';

const InitialSort = {
  sortBy: '',
  sortDirection: defaultSortDirection,
};

export default function useSortTable(defaultSort: ISortParams = InitialSort) {
  const [sortParams, setSortParams] = useState<ISortParams>(defaultSort);

  const onSort = (sortValue: any) => {
    const { order, field } = sortValue;
    const convertOrder: Record<string, IDirection> = {
      ascend: 'asc',
      descend: 'desc',
    };
    setSortParams(
      order
        ? { sortBy: field, sortDirection: convertOrder[order] }
        : { sortBy: '', sortDirection: '' },
    );
  };

  const { sortBy, sortDirection } = sortParams;

  return { sortBy, sortDirection, onSort };
}
