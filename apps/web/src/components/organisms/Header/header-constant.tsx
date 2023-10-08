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
import { SiteMap } from '@org/utils';

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
    path: SiteMap.Home.menu,
    id: SiteMap.Home.menu,
    icon: <IconHome />,
    subMenu: [],
  },
  {
    name: 'Dashboards',
    path: SiteMap.Dashboard.path,
    id: SiteMap.Dashboard.menu,
    icon: <IconDashBoard />,
    subMenu: [],
  },
  {
    name: 'Users',
    path: '',
    id: SiteMap.Users.menu,
    icon: <IconDashBoard />,
    subMenu: [
      {
        label: 'Admin',
        path: SiteMap.Users.Admin.path,
        id: SiteMap.Users.Admin.menu,
        icon: <IconDashBoard />,
      },
      {
        label: 'Staff',
        path: SiteMap.Users.Staff.path,
        id: SiteMap.Users.Staff.menu,
        icon: <IconDashBoard />,
      },
      {
        label: 'Center Admin',
        path: SiteMap.Users.CenterAdmin.path,
        id: SiteMap.Users.CenterAdmin.menu,
        icon: <IconDashBoard />,
      },
      {
        label: 'Center Tutor',
        path: SiteMap.Users.CenterTutor.path,
        id: SiteMap.Users.CenterTutor.menu,
        icon: <IconDashBoard />,
      },
      {
        label: 'Pesonal Tutor',
        path: SiteMap.Users.PesonalTutor.path,
        id: SiteMap.Users.PesonalTutor.menu,
        icon: <IconDashBoard />,
      },
      {
        label: 'Parents',
        path: SiteMap.Users.Parent.path,
        id: SiteMap.Users.Parent.menu,
        icon: <IconDashBoard />,
      },
      {
        label: 'Students',
        path: SiteMap.Users.Student.path,
        id: SiteMap.Users.Student.menu,
        icon: <IconDashBoard />,
      },
    ],
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
