import { css } from '@emotion/css';
import { COLOR } from '@org/utils';
import React, { PropsWithChildren } from 'react';
import { Space } from '../space';

function TextSection({
  color = COLOR.Primary,
  children,
  left = false,
}: PropsWithChildren<{ color?: string; left?: boolean }>) {
  return (
    <Space
      className={css`
        font-size: 3rem;
        color: ${color};
        font-weight: 700;
        padding: 10px 0;
        margin-bottom: 26px;
        position: relative;
        width: max-content;

        &:after {
          content: '';
          width: 120px;
          height: 6px;
          border-radius: 12px;
          background-color: #ff5520;
          position: absolute;

          bottom: 0;
          left: ${left ? '0' : '50%'};
          transform: translateX(${left ? '0' : '-50%'});
        }
      `}
    >
      {children}
    </Space>
  );
}

export default TextSection;
