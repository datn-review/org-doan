import { Rate as RateBase } from 'antd';
import { withForm } from '../../../form';
import { ReactNode } from 'react';
import { Space } from '../space';
import { css } from '@emotion/css';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
interface IRate {
  disabled?: boolean;
  onChange?: any;
  name: string;
  value?: number;
  [k: string]: any;
}

export function Rate({ onChange, value, ...props }: IRate) {
  return (
    <Space
      className={css`
        div {
          color: unset;
        }
      `}
    >
      <RateBase
        value={value}
        tooltips={desc}
        onChange={onChange}
        {...props}
      />
    </Space>
  );
}

export const RateForm = withForm<IRate>(Rate);
