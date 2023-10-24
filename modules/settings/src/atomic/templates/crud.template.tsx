import { css } from '@emotion/css';
import { Space } from '@org/ui';
import { PropsWithChildren } from 'react';

export function CRUDTemplate({ children }: PropsWithChildren) {
  return (
    <Space
      className={css`
        background-color: white;
        padding: 2rem;
        border-radius: 0.5rem;
      `}
    >
      {children}
    </Space>
  );
}
