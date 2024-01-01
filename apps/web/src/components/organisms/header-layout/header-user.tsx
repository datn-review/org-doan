import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  I18nIcon,
  MenuProps,
  NoticationIcon,
  Show,
  Space,
  VARIANT,
  IconSearch,
  Table,
  Logo,
  AvatarUser,
} from '@org/ui';
import * as S from './styled';
import { useTranslation } from '@org/i18n';
import { Link, useNavigate } from 'react-router-dom';
import { itemsLanguge, menuPerson } from './header-constant';
import { IMenuIcon } from './header-type';
import {
  logout,
  removeUserInfo,
  useAppDispatch,
  useAppSelector,
  useGetProfileMeQuery,
  setUserInfo,
} from '@org/store';
import { COLOR, SiteMap, getImage } from '@org/utils';
import { css } from '@emotion/css';
import { useEffect } from 'react';

const LinkItem = ({ path, icon, title }: any) => {
  return (
    <Link
      to={path}
      className='flex w-[16rem] !text-[1.4rem]'
    >
      <Space className='w-[3rem] '>{icon}</Space>
      <Space> {title}</Space>
    </Link>
  );
};

const Item = ({ icon, title }: any) => {
  return (
    <Space className='flex w-[20rem] text-[1.4rem]'>
      <Space className='w-[3rem] '>{icon}</Space>
      <Space> {title}</Space>
    </Space>
  );
};

const itemsPerson: MenuProps['items'] = menuPerson.map(({ icon, title, path, key }: IMenuIcon) => ({
  key,
  label: path ? (
    <LinkItem
      path={path}
      title={title}
      icon={icon}
    />
  ) : (
    <Item
      title={title}
      icon={icon}
    />
  ),
}));

function HeaderUser() {
  const { i18n, t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const { data } = useGetProfileMeQuery(
    {},
    {
      skip: !isAuthenticated,
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data));
    }
  }, [data]);
  const navigate = useNavigate();

  const changeLangue: MenuProps['onClick'] = (value) => {
    i18n.changeLanguage(value.key);
    localStorage.setItem('language', value.key);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeUserInfo());
    // navigate(SiteMap.Auth.Login.path);
    location.replace(SiteMap.Auth.Login.path);
  };

  const handlePerson: MenuProps['onClick'] = (value) => {
    switch (value.key) {
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <S.HeaderUser className='flex justify-between items-center '>
      <Link to='/'>
        {/* <img
          src='/assets/image/logo.jpg'
          alt='Login'
          className='h-[40px]'
        /> */}
        <Logo />
      </Link>

      <Space className={'flex gap-7 items-center justify-end '}>
        <Space
          className={css`
            cursor: pointer;
          `}
        >
          <IconSearch />
        </Space>

        <Dropdown
          placement='bottomRight'
          arrow
          trigger={['click']}
          menu={{
            items: itemsLanguge,
            onClick: changeLangue,
            selectedKeys: [i18n.language],
          }}
        >
          <Space className='cursor-pointer'>
            <I18nIcon />
          </Space>
        </Dropdown>

        <Badge
          count={10}
          overflowCount={9}
          className={css`
            cursor: pointer;
          `}
        >
          <NoticationIcon />
        </Badge>
        <Show
          when={isAuthenticated}
          fallback={
            <Link to={SiteMap.Auth.Login.path}>
              <Button
                $variant={VARIANT.Outlined}
                className={css`
                  border-radius: 2rem !important;
                `}
              >
                {t('auth.title.login')}
              </Button>
            </Link>
          }
        >
          <Dropdown
            placement='bottomRight'
            arrow
            trigger={['click']}
            menu={{
              items: itemsPerson,
              onClick: handlePerson,
            }}
          >
            {/* <AvatarUser
              // img={user?.photo?.path ? user?.photo?.path : ''}
              title={user?.lastName}
              id={user?.id}
            /> */}
            <Avatar className={`bg-purple-500 text-white cursor-pointer`}>T</Avatar>
          </Dropdown>
        </Show>
      </Space>
    </S.HeaderUser>
  );
}

export default HeaderUser;
