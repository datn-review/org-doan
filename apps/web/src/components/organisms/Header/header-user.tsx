import { Avatar, Badge, Dropdown, I18nIcon, MenuProps, NoticationIcon, Space } from '@org/ui';
import * as S from './styled';
import { useTranslation } from '@org/i18n';
import { Link } from 'react-router-dom';
import { itemsLanguge, menuPerson } from './header-constant';
import { IMenuIcon } from './header-type';

const LinkItem = ({ path, icon, title }: any) => {
  return (
    <Link
      to={path}
      className='flex w-[20rem] pl-5'
    >
      <Space className='w-[3rem] '>{icon}</Space>
      <Space> {title}</Space>
    </Link>
  );
};

const Item = ({ icon, title }: any) => {
  return (
    <Space className='flex w-[20rem] pl-5'>
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
  const { i18n } = useTranslation();
  const changeLangue: MenuProps['onClick'] = (value) => {
    i18n.changeLanguage(value.key);
  };

  return (
    <S.HeaderUser className='flex justify-between items-center px-[1.5rem]'>
      <Link to='/'>
        <img
          src='/assets/image/logo.jpg'
          alt='Login'
          className='h-[40px]'
        />
      </Link>

      <Space className={'flex gap-7 items-center justify-end '}>
        <div>SEARCH</div>

        <Dropdown
          placement='bottomRight'
          arrow
          menu={{
            items: itemsLanguge,
            onClick: changeLangue,
          }}
        >
          <Space className='cursor-pointer'>
            <I18nIcon />
          </Space>
        </Dropdown>

        <Badge
          count={10}
          overflowCount={9}
        >
          <NoticationIcon />
        </Badge>

        <Dropdown
          placement='bottomRight'
          arrow
          trigger={['click']}
          menu={{
            items: itemsPerson,
          }}
        >
          <Avatar className='bg-lime-500 text-white cursor-pointer'>T</Avatar>
        </Dropdown>
      </Space>
    </S.HeaderUser>
  );
}

export default HeaderUser;
