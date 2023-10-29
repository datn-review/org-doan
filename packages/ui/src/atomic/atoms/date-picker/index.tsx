import { DatePicker as DatePickerBase, DatePickerProps } from 'antd';
import React from 'react';
import { withForm } from '../../../form';
import { css, cx } from '@emotion/css';

interface IDate {
  label?: string;
  name?: string;
  onChange?: (value: any) => void;
  [k: string]: any;
}
export function DatePicker({ label, onChange, ...rest }: IDate & DatePickerProps) {
  return (
    <DatePickerBase
      onChange={onChange}
      className={cx(
        css`
          width: 100%;
        `,
        rest?.className,
      )}
      {...rest}
    />
  );
}

export const DatePickerForm = withForm<IDate & { name: string }>(DatePicker);
