// import { ReactComponent as I18nIcon2 } from '@assets/icon-svg/arrow-clockwise.svg';
import HeaderCategory from './header-category';
import HeaderUser from './header-user';
import * as S from './styled';

export const Header = () => {
  return (
    <S.Header>
      <HeaderUser />
      <HeaderCategory />
    </S.Header>
  );
};
