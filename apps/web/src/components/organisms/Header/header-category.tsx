import { Button, TYPE_BUTTON, VARIANT } from '@org/ui';
import { Link } from 'react-router-dom';
import { menuCategory } from './header-constant';
import { MenuItem } from './header-type';
import * as S from './styled';
import { useAppSelector, useAppDispatch } from '@org/store';

import { useEffect } from 'react';
import { setActiveGroup } from '@org/store/src/slices';

function HeaderCategory() {
  const { menu } = useAppSelector((state) => state.activeMenu);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: 'home' }));
  }, []);

  console.log('🚀 ~ file: header-category.tsx:10 ~ HeaderCategory ~ menu:', menu);
  return (
    <S.HeaderCategory className='flex gap-1 px-[1.5rem] py-4'>
      1
      {menuCategory.map(({ path, name, icon }: MenuItem) => (
        <Link
          to={path}
          key={path}
        >
          <Button
            $variant={VARIANT.Text}
            $type={TYPE_BUTTON.Secondary}
          >
            {icon} {name}
          </Button>
        </Link>
      ))}
    </S.HeaderCategory>
  );
}

export default HeaderCategory;
