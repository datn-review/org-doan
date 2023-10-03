import { useAppSelector } from '@org/store';
import { Button, TYPE_BUTTON, VARIANT } from '@org/ui';
import { Link } from 'react-router-dom';

import { menuCategory } from '../Header/header-constant';
import { MenuItem } from '../Header/header-type';
import * as S from '../Header/styled';
function HeaderCategory() {
  const { menu } = useAppSelector((state) => state.activeMenu);

  return (
    <S.HeaderCategory className='flex gap-1 px-[1.5rem] py-4'>
      {menuCategory.map(({ path, name, icon, id }: MenuItem) => (
        <Link
          to={path}
          key={path}
        >
          <Button
            $variant={id == menu ? VARIANT.Default : VARIANT.Text}
            $type={id == menu ? TYPE_BUTTON.Primary : TYPE_BUTTON.Secondary}
          >
            {icon} {name}
          </Button>
        </Link>
      ))}
    </S.HeaderCategory>
  );
}

export default HeaderCategory;
