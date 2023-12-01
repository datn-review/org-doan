// import { ReactComponent as I18nIcon2 } from '@assets/icon-svg/arrow-clockwise.svg';
import { Space } from '@org/ui';
import HeaderCategory from './header-category';
import HeaderUser from './header-user';
import * as S from './styled';
import { css } from '@emotion/css';

export function Header() {
  return (
    <S.Header>
      <Space className='section-layout section-header'>
        <HeaderUser />
        <HeaderCategory />
      </Space>
    </S.Header>
  );
}
