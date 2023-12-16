import { css, cx } from '@emotion/css';
import { COLOR, mediaDesktop, mediaMiniTablet, mediaPhone, mediaTablet } from '@org/utils';
import React, { PropsWithChildren } from 'react';
import { Space } from '../space';

function TextSection({
  color = COLOR.Primary,
  className,
  children,
  left = false,
  secondary = false,
}: PropsWithChildren<{ color?: string; left?: boolean; className?: any; secondary?: boolean }>) {
  return (
    <Space
      className={cx(
        css`
          font-size: 3rem;
          color: ${color};
          font-weight: 700;
          padding: 10px 0;
          margin-bottom: 26px;
          position: relative;
          width: max-content;
          ${mediaDesktop} {
            font-size: 3rem;
          }

          ${mediaTablet} {
            font-size: 2.5rem;
          }
          ${mediaMiniTablet} {
            font-size: 2rem;
          }
          ${mediaPhone} {
            font-size: 1.8rem;
          }

          &:after {
            content: '';
            width: 120px;
            height: 6px;
            border-radius: 12px;
            background-color: ${secondary ? COLOR.Primary : '#ff5520'};
            position: absolute;

            bottom: 0;
            left: ${left ? '0' : '50%'};
            transform: translateX(${left ? '0' : '-50%'});
          }
        `,
        className,
      )}
    >
      {children}
    </Space>
  );
}

export default TextSection;
