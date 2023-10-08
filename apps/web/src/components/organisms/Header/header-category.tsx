import { useAppSelector } from '@org/store';
import { Button, Dropdown, IconArrowDown, SIZE, Space, TYPE_BUTTON, VARIANT } from '@org/ui';
import { Link, useNavigate } from 'react-router-dom';

import { menuCategory } from './header-constant';
import { MenuItem } from './header-type';
import * as S from './styled';
function HeaderCategory() {
  const { menu } = useAppSelector((state) => state.activeMenu);
  const navigate = useNavigate();
  const renderButton = ({ id, isSub, icon, name }: any) => {
    return (
      <Button
        $variant={id == menu ? VARIANT.Menu : VARIANT.Text}
        $type={id == menu ? TYPE_BUTTON.Primary : TYPE_BUTTON.Secondary}
        $size={SIZE.Menu}
      >
        {icon}
        <Space>{name}</Space>
        {isSub && <IconArrowDown />}
      </Button>
    );
  };
  const handleClick = (e: any) => {
    navigate(e.item.props.path);
  };
  const renderMenu = (menuCategory: MenuItem[]) =>
    menuCategory.map(({ path, name, icon, id, subMenu }: MenuItem) => {
      if (subMenu.length > 0) {
        return (
          <Dropdown
            placement='bottomLeft'
            menu={{
              items: subMenu,
              onClick: handleClick,
            }}
          >
            {renderButton({
              id,
              name,
              icon,
              isSub: true,
            })}
          </Dropdown>
        );
      }
      return (
        <Link
          to={path}
          key={path}
        >
          {renderButton({
            id,
            name,
            icon,
            isSub: false,
          })}
        </Link>
      );
    });

  return (
    <S.HeaderCategory className='flex gap-2 px-[1.5rem] py-4'>
      {renderMenu(menuCategory)}
    </S.HeaderCategory>
  );
}

export default HeaderCategory;
