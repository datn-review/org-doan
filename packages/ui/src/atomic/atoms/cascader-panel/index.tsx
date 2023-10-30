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
  const ref = useRef();
  console.log('🚀 ~ file: index.tsx:14 ~ CascaderPanel ~ ref:', ref);
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
            min-height: 3.8rem;
            .ant-cascader-menus {
              min-width: 100%;
            }
            .ant-cascader-menu:last-child {
              width: calc(100% - 160px);
              display: flex;
              flex-wrap: wrap;
              .ant-cascader-menu-item {
                min-width: 65px;
                height: 65px;
              }
            }
          `,
          rest.className,
        )}
        onChange={onChange}
        ref={ref}
        onMouseDown={() => console.log(';ok')}
        {...rest}
      />
    </Space>
  );
}

export const CascaderPanelForm = withForm<ICascaderPanel & { name: string }>(CascaderPanel);
