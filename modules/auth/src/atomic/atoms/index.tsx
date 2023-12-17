import { BoxCenter } from '@org/ui';
import React from 'react';

import FB from '../../assets/images/facebook.png';
import TW from '../../assets/images/twitter.png';
import GG from '../../assets/images/google.png';
import { css } from '@emotion/css';

function OAuth2ICons() {
  return (
    <BoxCenter
      className={css`
        gap: 1rem;
      `}
    >
      <img
        src={FB}
        className={css`
          width: 40px;
          cursor: pointer;
        `}
      />
      <img
        src={TW}
        className={css`
          width: 40px;
          cursor: pointer;
        `}
      />
      <img
        src={GG}
        className={css`
          width: 40px;
          cursor: pointer;
        `}
      />
    </BoxCenter>
  );
}

export default OAuth2ICons;
