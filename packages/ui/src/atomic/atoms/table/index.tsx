import React from 'react';
import { Table as TableBase, TableProps } from 'antd';

export function Table({ props }: any) {
  return (
    <>
      Table
      <TableBase {...props} />;
    </>
  );
}
