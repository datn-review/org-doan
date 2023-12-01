import { useAppSelector } from '@org/store';
import {
  Button,
  Drawer,
  Dropdown,
  IconArrowDown,
  MenuOutlined,
  SIZE,
  Space,
  TYPE_BUTTON,
  VARIANT,
} from '@org/ui';
import { Link, useNavigate } from 'react-router-dom';

import { menuCategory } from './header-constant';
import { MenuItem } from './header-type';
import * as S from './styled';
import { css, cx } from '@emotion/css/macro';
import { COLOR, COLOR_RGB, MediaEnum, mediaDesktop, mediaTablet } from '@org/utils';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@org/core';
import { Else, If, Then } from 'react-if';
function HeaderCategory() {
  const { menu, subMenu: subMenuActive } = useAppSelector((state) => state.activeMenu);
  const [hideMenu, setHideMenu] = useState(false);
  const media = useMediaQuery();

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
    setHideMenu(false);
  };
  const renderMenu = (menuCategory: MenuItem[]) =>
    menuCategory.map(({ path, name, icon, id, subMenu }: MenuItem) => {
      if (subMenu.length > 0) {
        return (
          <Dropdown
            placement={'bottomLeft'}
            menu={{
              items: subMenu,
              selectedKeys: [subMenuActive],
              onClick: handleClick,
            }}
            trigger={['click']}
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
          onClick={() => setHideMenu(false)}
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

  const category = useMemo(() => {
    return menuCategory();
  }, [localStorage.getItem('authorities')]);

  return (
    <S.HeaderCategory
      className={css`
        ${mediaDesktop} {
          position: relative;
        }
      `}
    >
      <If condition={media === MediaEnum.Desktop}>
        <Then>
          <Space className={cx('flex gap-2 py-4')}>{renderMenu(category)}</Space>
        </Then>
        <Else>
          <Space
            className={css`
              padding: 4px 8px;
              border-radius: 4px;
              cursor: pointer;
              display: block;
              &:hover {
                background: #e3e3e3;
              }
            `}
            onClick={() => setHideMenu(true)}
          >
            <MenuOutlined />
          </Space>
          <Drawer
            open={hideMenu}
            onClose={() => setHideMenu(false)}
            placement='left'
            width={300}
          >
            <Space
              className={cx(
                'flex gap-2 ',
                css`
                  flex-direction: column;
                  background-color: white;
                  border-radius: 0.5rem;
                  button {
                    width: 100%;
                    justify-content: flex-start;
                    div {
                      flex: 1;
                      text-align: left;
                    }
                  }
                `,
              )}
            >
              {renderMenu(category)}
            </Space>
          </Drawer>
        </Else>
      </If>
    </S.HeaderCategory>
  );
}

export default HeaderCategory;
