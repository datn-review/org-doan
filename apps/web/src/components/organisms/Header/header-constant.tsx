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
  IconUser,
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
    name: <Translation>{(t) => t('home')}</Translation>,
    path: SiteMap.Home.path,
    id: SiteMap.Home.menu,
    icon: <IconHome />,
    subMenu: [],
  },
  {
    name: <Translation>{(t) => t('dashboards')}</Translation>,
    path: SiteMap.Dashboard.path,
    id: SiteMap.Dashboard.menu,
    icon: <IconDashBoard />,
    subMenu: [],
  },
  {
    name: <Translation>{(t) => t('users')}</Translation>,
    path: '',
    id: SiteMap.Users.menu,
    icon: <IconUser />,
    subMenu: [
      {
        label: <Translation>{(t) => t('manage.admin')}</Translation>,
        path: SiteMap.Users.Admin.path,
        id: SiteMap.Users.Admin.menu,
        key: SiteMap.Users.Admin.menu,
        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('manage.staff')}</Translation>,
        path: SiteMap.Users.Staff.path,
        id: SiteMap.Users.Staff.menu,
        key: SiteMap.Users.Staff.menu,
        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('manage.center.admin')}</Translation>,
        path: SiteMap.Users.CenterAdmin.path,
        id: SiteMap.Users.CenterAdmin.menu,
        key: SiteMap.Users.CenterAdmin.menu,

        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('manage.center.tutor')}</Translation>,
        path: SiteMap.Users.CenterTutor.path,
        id: SiteMap.Users.CenterTutor.menu,
        key: SiteMap.Users.CenterTutor.menu,

        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('manage.personal.tutor')}</Translation>,
        path: SiteMap.Users.PesonalTutor.path,
        id: SiteMap.Users.PesonalTutor.menu,
        key: SiteMap.Users.PesonalTutor.menu,

        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('manage.parent')}</Translation>,
        path: SiteMap.Users.Parent.path,
        id: SiteMap.Users.Parent.menu,
        key: SiteMap.Users.Parent.menu,

        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('manage.student')}</Translation>,
        path: SiteMap.Users.Student.path,
        id: SiteMap.Users.Student.menu,
        key: SiteMap.Users.Student.menu,

        icon: <></>,
      },
    ],
  },
  {
    name: <Translation>{(t) => t('settings.name')}</Translation>,
    path: '',
    id: SiteMap.Settings.menu,
    icon: <IconUser />,
    subMenu: [
      {
        label: <Translation>{(t) => t('settings.grade.level')}</Translation>,
        path: SiteMap.Settings.GradeLevel.path,
        id: SiteMap.Settings.GradeLevel.menu,
        key: SiteMap.Settings.GradeLevel.menu,
        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('settings.subject')}</Translation>,
        path: SiteMap.Settings.Subject.path,
        id: SiteMap.Settings.Subject.menu,
        key: SiteMap.Settings.Subject.menu,
        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('settings.certification')}</Translation>,
        path: SiteMap.Settings.Certification.path,
        id: SiteMap.Settings.Certification.menu,
        key: SiteMap.Settings.Certification.menu,
        icon: <></>,
      },
      {
        label: <Translation>{(t) => t('settings.skills')}</Translation>,
        path: SiteMap.Settings.Skills.path,
        id: SiteMap.Settings.Skills.menu,
        key: SiteMap.Settings.Skills.menu,
        icon: <></>,
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
