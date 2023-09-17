import { Button, Badge, I18nIcon, NoticationIcon } from '@org/ui';
// import { ReactComponent as I18nIcon2 } from '@assets/icon-svg/arrow-clockwise.svg';
import * as S from './styled';
import { Link } from 'react-router-dom';

type MenuItem = {
  name: string;
  path: string;
  icon: string;
  id: string;
  subMenu: any[];
};
export const Header = () => {
  const menu: MenuItem[] = [
    {
      name: 'Home',
      path: '/',
      id: 'home',
      icon: '',
      subMenu: [],
    },
    {
      name: 'DashBoard',
      path: '/dashboard',
      id: 'dashboard',
      icon: '',
      subMenu: [],
    },
  ];

  return (
    <S.Header>
      <S.HeaderUser className='flex justify-between items-center px-[1.5rem] py-2'>
        <Link to='/'>
          <img
            src='/assets/image/logo.jpg'
            alt='Login'
            className='h-[40px]'
          />
        </Link>
        <div className={'flex items-end gap-2'}>
          <>SEARCH</>

          <I18nIcon />

          <Badge
            count={10}
            overflowCount={9}
          >
            <NoticationIcon />
          </Badge>

          <>User</>
        </div>
      </S.HeaderUser>
      <S.HeaderCategory className='flex gap-1 px-[1.5rem]'>
        {menu.map(({ path, name, icon }: MenuItem) => (
          <Link
            to={path}
            key={path}
          >
            <Button>
              {icon}
              {name}
            </Button>
          </Link>
        ))}
      </S.HeaderCategory>
    </S.Header>
  );
};
