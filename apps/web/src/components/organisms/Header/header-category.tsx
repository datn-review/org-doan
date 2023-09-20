import { Button } from '@org/ui';
import { Link } from 'react-router-dom';
import { menuCategory } from './header-constant';
import { MenuItem } from './header-type';
import * as S from './styled';

function HeaderCategory() {
  return (
    <S.HeaderCategory className='flex gap-1 px-[1.5rem] py-4'>
      {menuCategory.map(({ path, name, icon }: MenuItem) => (
        <Link
          to={path}
          key={path}
        >
          <Button>
            {icon} {name}
          </Button>
        </Link>
      ))}
    </S.HeaderCategory>
  );
}

export default HeaderCategory;
