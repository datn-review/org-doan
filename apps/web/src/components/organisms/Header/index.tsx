import { Button, Badge, I18nIcon, NoticationIcon } from '@org/ui';
// import { ReactComponent as I18nIcon2 } from '@assets/icon-svg/arrow-clockwise.svg';
import * as S from './styled';
import { Link } from 'react-router-dom';
import { useTranslation } from '@org/i18n';

type MenuItem = {
  name: string;
  path: string;
  icon: string;
  id: string;
  subMenu: any[];
};
export const Header = () => {
  const { t, i18n } = useTranslation();
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
  const changeLangue = (value: string) => () => {
    console.log('🚀 ~ file: index.tsx:33 ~ changeLangue ~ value:', value);
    i18n.changeLanguage(value);
  };

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
          <button onClick={changeLangue('en-EN')}>EN</button>
          ||||
          <button onClick={changeLangue('vi-VN')}>VN</button>
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
      <div>{t('title')}</div>
    </S.Header>
  );
};
