import React, { useRef } from 'react';
import { Cascader, CascaderProps } from 'antd';
import { Space } from '../space';
import { css, cx } from '@emotion/css';
import { withForm } from './../../../form/connectForm';
interface ICascaderPanel {
  label?: string;
  name?: string;
  onChange?: (value: any) => void;
  [k: string]: any;
}
export function CascaderPanel({ label, onChange, ...rest }: any) {
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

      <Cascader.Panel
        className={cx(
          css`
            min-width: 100%;
            /* min-height: 3.8rem; */
            .ant-cascader-menus {
              min-width: 100%;
            }
          `,
          rest.className,
        )}
        onChange={onChange}
        {...rest}
      />
    </Space>
  );
}

export const CascaderPanelForm = withForm<ICascaderPanel & { name: string }>(CascaderPanel);
