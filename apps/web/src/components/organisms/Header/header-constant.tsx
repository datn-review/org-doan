import {
  BillingIcon,
  IconDashBoard,
  IconDolar,
  IconFAQ,
  IconHelp,
  IconHome,
  IconLogout,
  IconPerson,
  IconSetting,
  MenuProps,
} from '@org/ui';

import type { IMenuIcon, MenuItem } from '../header/header-type';
import { Translation } from '@org/i18n';

export const itemsLanguge: MenuProps['items'] = [
  {
    key: 'vi-VN',
    label: <Translation>{(t) => t('vi-VN')}</Translation>,
  },
  {
    key: 'en-EN',
    label: <Translation>{(t) => t('en-EN')}</Translation>,
  },
];

export const menuCategory: MenuItem[] = [
  {
    name: 'Home',
    path: '/',
    id: 'home',
    icon: <IconHome />,
    subMenu: [],
  },
  {
    name: 'Dashboards',
    path: '/dashboard',
    id: 'dashboard',
    icon: <IconDashBoard />,
    subMenu: [],
  },
  {
    name: 'Users',
    path: '/users',
    id: 'user',
    icon: <IconDashBoard />,
    subMenu: [],
  },
];

export const menuPerson: IMenuIcon[] = [
  {
    path: '/profile',
    icon: <IconPerson />,
    key: 'profile',
    title: 'Profile',
  },
  {
    path: '/setting',
    icon: <IconSetting />,
    key: 'setting',
    title: 'Setting',
  },
  {
    path: '/builling',
    icon: <BillingIcon />,
    key: 'builling',
    title: 'Builling',
  },
  {
    path: '/help',
    icon: <IconHelp />,
    key: 'help',
    title: 'Help',
  },
  {
    path: '/Pricing',
    icon: <IconDolar />,
    key: 'pricing',
    title: 'Pricing',
  },

  {
    path: '/FAQ',
    icon: <IconFAQ />,
    key: 'FAQ',
    title: 'FAQ',
  },
  {
    path: '',
    icon: <IconLogout />,
    key: 'logout',
    title: 'logout',
  },
];
