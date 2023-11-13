import { css } from '@emotion/css';
import { COLOR } from '@org/utils';
import React, { PropsWithChildren } from 'react';

function H3({ children, color = COLOR.Primary }: PropsWithChildren & { color?: string }) {
  return (
    <h3
      className={css`
        color: ${color};
        margin-bottom: 2rem;
      `}
    >
      {children}
    </h3>
  );
}

export default H3;
