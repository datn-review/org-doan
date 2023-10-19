import { css } from '@emotion/css';
import { COLOR } from '@org/utils';
import React, { PropsWithChildren } from 'react';

function H2({ children, color = COLOR.Primary }: PropsWithChildren & { color?: string }) {
  return (
    <h2
      className={css`
        color: ${color};
        margin-bottom: 2rem;
      `}
    >
      {children}
    </h2>
  );
}

export default H2;
