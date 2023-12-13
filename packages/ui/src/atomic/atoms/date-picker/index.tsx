import { DatePicker as DatePickerBase, DatePickerProps } from 'antd';
import React from 'react';
import { withForm } from '../../../form';
import { css, cx } from '@emotion/css';
import locale from 'antd/es/date-picker/locale/vi_VN';
import localeEN from 'antd/es/date-picker/locale/en_US';
import { i18next } from '@org/i18n';

const { RangePicker: RangePickerBase } = DatePickerBase;

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
      locale={i18next.language === 'en-EN' ? localeEN : locale}
      {...rest}
    />
  );
}

export const DatePickerForm = withForm<IDate & { name: string }>(DatePicker);

export function RangePicker({ label, onChange, ...rest }: IDate) {
  return (
    <RangePickerBase
      onChange={onChange}
      className={cx(
        css`
          width: 100%;
        `,
        rest?.className,
      )}
      locale={i18next.language === 'en-EN' ? localeEN : locale}
      {...rest}
    />
  );
}

export const RangePickerForm = withForm<IDate & { name: string }>(RangePicker);
