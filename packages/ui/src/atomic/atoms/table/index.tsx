import React, { useMemo } from 'react';
import { Pagination, Spin, Table as TableBase, TableProps } from 'antd';
import { Space } from '../space';
import { css } from '@emotion/css';
import { Select } from '../select';
import { extend } from 'dayjs';
import { SortOrder } from 'antd/es/table/interface';
import { findIndex } from 'lodash';
import { IDirection, ISortParams } from './hooks/useSortTable';

interface IValues {
  pagination: { currentPage: number };
  sort: ISortParams;
}
interface TableIntance {
  values: IValues;
  limit: number;
  onChangePage: any;
  onSort: any;
}
interface ITable {
  tableInstance: TableIntance;
  [k: string]: any;
}

export function Table({
  tableInstance,
  totalPage,
  onChange,
  columns,
  data,
  loading = false,
  ...props
}: ITable) {
  const {
    values: {
      pagination: { currentPage },
      sort: { sortBy, sortDirection },
    },
    limit,
    onChangePage,
    onSort,
  } = tableInstance;

  const handleChange = (pagination: any, filter: any, sort: any, extra: any) => {
    onChange && onChange(pagination, filter, sort, extra);
    onSort && onSort(sort);
    onChangePage(1);
  };

  const convertColumns = useMemo(() => {
    if (!columns) return;

    const newColumns = [...columns];
    if (sortDirection && sortBy) {
      const columnIndex = findIndex(columns, { dataIndex: sortBy });
      const convertOrder: { asc: SortOrder; desc: SortOrder } = {
        asc: 'ascend',
        desc: 'descend',
      };

      newColumns.forEach((col, index) => {
        if (columnIndex > -1 && columnIndex == index) {
          col.sortOrder = convertOrder[sortDirection];
          col.defaultSortOrder = convertOrder[sortDirection];
        } else {
          delete col['sortOrder'];
          delete col['defaultSortOrder'];
        }
      });
    }
    return newColumns;
  }, [columns, sortBy, sortDirection]);
  return (
    <Spin spinning={loading}>
      <TableBase
        onChange={handleChange}
        columns={convertColumns}
        pagination={false}
        dataSource={data}
        showSorterTooltip={false}
        sortDirections={['ascend', 'descend', 'ascend']}
        {...props}
      />
      <Space
        className={css`
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        `}
      >
        {!!totalPage && (
          <Pagination
            defaultCurrent={currentPage}
            current={currentPage}
            defaultPageSize={limit}
            pageSize={limit}
            onChange={onChangePage}
            simple
            total={totalPage}
          />
        )}
      </Space>
    </Spin>
  );
}
export const SelectLimitTable = ({
  onChange,
  defaultValue,
}: {
  defaultValue: number;
  onChange: (value: number) => void;
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      options={[
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
      ]}
    />
  );
};

export { useTable } from './hooks/useTable';
