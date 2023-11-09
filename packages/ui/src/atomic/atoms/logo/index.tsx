import React from 'react';
import { Space } from '../space';
import { COLOR } from '@org/utils';
import { css, cx } from '@emotion/css';
export function Logo() {
  return (
    <Space
      className={cx(
        css`
          font-size: 20px;
          color: ${COLOR.Primary};
          font-weight: 700;
          padding: 8px 0;
          position: relative;
          &:after {
            content: '';
            width: 70px;
            height: 6px;
            border-radius: 12px;
            background-color: #ff5520;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        `,
        'logo',
      )}
    >
      SmartTutor
    </Space>
  );
}
