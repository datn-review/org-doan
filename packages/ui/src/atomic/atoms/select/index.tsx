import React from 'react';
import { Select as SelectBase, SelectProps } from 'antd';
import { Space } from '../space';
import { css, cx } from '@emotion/css';
import { withForm } from './../../../form/connectForm';
interface ISelect extends SelectProps {
  label?: string;
  name?: string;
  onChange?: (value: any) => void;
}
export function Select({ label, onChange, ...rest }: ISelect) {
  return (
    <Space>
      {label && (
        <label
          className={css`
            display: block;
            padding-bottom: 0.3rem;
            font-size: 1.3rem;
          `}
        >
          {label}
        </label>
      )}
      <SelectBase
        className={cx(
          css`
            min-width: 6em;
            min-height: 3.8rem;
          `,
          rest.className,
        )}
        onChange={onChange}
        {...rest}
      />
    </Space>
  );
}

export const SelectForm = withForm<ISelect & { name: string }>(Select);
