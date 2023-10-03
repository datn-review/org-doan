import {
  BillingIcon,
  IconDolar,
  IconFAQ,
  IconHelp,
  IconLogout,
  IconPerson,
  IconSetting,
  MenuProps,
} from '@org/ui';

import type { IMenuIcon, MenuItem } from '../Header/header-type';

export const itemsLanguge: MenuProps['items'] = [
  {
    key: 'vi-VN',
    label: 'vi-VN',
  },
  {
    key: 'en-EN',
    label: 'en-EN',
  },
];

export const menuCategory: MenuItem[] = [
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
