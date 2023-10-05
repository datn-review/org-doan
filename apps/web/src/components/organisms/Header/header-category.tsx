import { useAppSelector } from '@org/store';
import { Button, SIZE, Space, TYPE_BUTTON, VARIANT } from '@org/ui';
import { Link } from 'react-router-dom';

import { menuCategory } from './header-constant';
import { MenuItem } from './header-type';
import * as S from './styled';
function HeaderCategory() {
  const { menu } = useAppSelector((state) => state.activeMenu);

  return (
    <S.HeaderCategory className='flex gap-2 px-[1.5rem] py-4'>
      {menuCategory.map(({ path, name, icon, id }: MenuItem) => (
        <Link
          to={path}
          key={path}
        >
          <Button
            $variant={id == menu ? VARIANT.Menu : VARIANT.Text}
            $type={id == menu ? TYPE_BUTTON.Primary : TYPE_BUTTON.Secondary}
            $size={SIZE.Menu}
          >
            {icon}
            <Space>{name}</Space>
          </Button>
        </Link>
      ))}
    </S.HeaderCategory>
  );
}

export default HeaderCategory;
