import React from 'react';
import { Select as SelectBase, SelectProps } from 'antd';
import { Space } from '../space';
export function Select({ ...rest }: SelectProps) {
  return (
    <Space>
      <SelectBase {...rest} />
    </Space>
  );
}
