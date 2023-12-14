import botLogo from '../../assets/img/bot.png';
import { css } from '@emotion/css';

export const AvataBot = () => {
  return (
    <img
      src={botLogo}
      alt='botLogo'
      className={css`
        height: 4rem;
        width: 4rem;
      `}
    />
  );
};
