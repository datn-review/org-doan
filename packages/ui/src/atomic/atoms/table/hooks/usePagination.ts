import { useState } from 'react';

const initState = { currentPage: 1 };

export default function usePagination() {
  const [pagination, setPagination] = useState(initState);

  const onChangePage = (page: number | '') => {
    // @ts-ignore
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const { currentPage } = pagination;
  return { currentPage, onChangePage };
}
