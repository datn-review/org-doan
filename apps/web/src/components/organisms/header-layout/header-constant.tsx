import {
  BillingIcon,
  IconAssessment,
  IconBook,
  IconClasses,
  IconClassesName,
  IconContacs,
  IconDashBoard,
  IconDolar,
  IconFAQ,
  IconHelp,
  IconHome,
  IconLogout,
  IconNews,
  IconPencil,
  IconPerson,
  IconSchool,
  IconSetting,
  IconUser,
  MenuProps,
  PaymentIcon,
} from '@org/ui';

import { IMenuIcon, MenuItem } from './header-type';
import { Translation, i18nContant } from '@org/i18n';
import { RolesEnum, SiteMap } from '@org/utils';
import { ifAnyGranted } from '@org/auth';

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

export const menuCategory = (): MenuItem[] => {
  return [
    {
      name: <Translation>{(t) => t('home')}</Translation>,
      path: SiteMap.Home.path,
      id: SiteMap.Home.menu,
      icon: <IconHome />,
      subMenu: [],
      isShow: ifAnyGranted(SiteMap.Home.roles),
    },
    {
      name: <Translation>{(t) => t('class.new')}</Translation>,
      path: SiteMap.ClassNew.path,
      id: SiteMap.ClassNew.menu,
      icon: <IconClassesName />,
      subMenu: [],
      isShow: ifAnyGranted(SiteMap.ClassNew.roles),
    },
    {
      name: <Translation>{(t) => t('tutor')}</Translation>,
      path: SiteMap.Tutor.path,
      id: SiteMap.Tutor.menu,
      icon: <IconSchool />,
      subMenu: [],
      isShow: ifAnyGranted(SiteMap.Tutor.roles),
    },
    {
      name: <Translation>{(t) => t('find.tutor')}</Translation>,
      path: SiteMap.LookForTutor.path,
      id: SiteMap.LookForTutor.menu,
      icon: <IconPencil />,
      subMenu: [],
      isShow: ifAnyGranted(SiteMap.LookForTutor.roles),
    },
    // {
    //   name: <Translation>{(t) => t('manage.class')}</Translation>,
    //   path: SiteMap.TutorClass.path,
    //   id: SiteMap.TutorClass.menu,
    //   icon: <IconHome />,
    //   subMenu: [],
    //   // isShow: ifAnyGranted([RolesEnum.WEB_ADMIN]),
    // },
    {
      name: <Translation>{(t) => t('dashboards')}</Translation>,
      path: SiteMap.Dashboard.path,
      id: SiteMap.Dashboard.menu,
      icon: <IconDashBoard />,
      subMenu: [],
      isShow: ifAnyGranted(SiteMap.Dashboard.roles),
    },
    {
      name: <Translation>{(t) => t('setttings.payment')}</Translation>,
      path: SiteMap.Payment.path,
      id: SiteMap.Payment.menu,
      icon: <PaymentIcon />,
      subMenu: [],
      isShow: ifAnyGranted(SiteMap.Payment.roles),
    },
    {
      name: <Translation>{(t) => t('users')}</Translation>,
      path: '',
      id: SiteMap.Users.menu,
      icon: <IconUser />,
      isShow: ifAnyGranted(SiteMap.Users.roles),
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
        // {
        //   label: <Translation>{(t) => t('manage.center.admin')}</Translation>,
        //   path: SiteMap.Users.CenterAdmin.path,
        //   id: SiteMap.Users.CenterAdmin.menu,
        //   key: SiteMap.Users.CenterAdmin.menu,

        //   icon: <></>,
        // },
        // {
        //   label: <Translation>{(t) => t('manage.center.tutor')}</Translation>,
        //   path: SiteMap.Users.CenterTutor.path,
        //   id: SiteMap.Users.CenterTutor.menu,
        //   key: SiteMap.Users.CenterTutor.menu,

        //   icon: <></>,
        // },
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
      icon: <IconSetting />,
      isShow: ifAnyGranted(SiteMap.Settings.roles),
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

    {
      name: <Translation>{(t) => t('news')}</Translation>,
      path: SiteMap.Manage.News.path,
      id: SiteMap.Manage.News.menu,
      icon: <IconNews />,
      isShow: ifAnyGranted(SiteMap.Manage.News.roles),
      subMenu: [],
    },
    {
      name: <Translation>{(t) => t('contact.category')}</Translation>,
      path: SiteMap.Manage.Contacts.path,
      id: SiteMap.Manage.Contacts.menu,
      icon: <IconContacs />,
      isShow: ifAnyGranted(SiteMap.Manage.Contacts.roles),
      subMenu: [],
    },

    {
      name: <Translation>{(t) => t('assessment.name')}</Translation>,
      path: '',
      id: SiteMap.Manage.menu,
      icon: <IconAssessment />,
      isShow: ifAnyGranted([RolesEnum.WEB_ADMIN, RolesEnum.PESONAL_TUTOR]),
      subMenu: [
        {
          label: <Translation>{(t) => t('assessment.exercise')}</Translation>,
          path: SiteMap.Assessment.Exercise.path,
          id: SiteMap.Assessment.Exercise.menu,
          key: SiteMap.Assessment.Exercise.menu,
          icon: <></>,
        },
        {
          label: <Translation>{(t) => t('assessment.questions')}</Translation>,
          path: SiteMap.Assessment.Questions.path,
          id: SiteMap.Assessment.Questions.menu,
          key: SiteMap.Assessment.Questions.menu,
          icon: <></>,
        },
        // {
        //   label: <Translation>{(t) => t('assessment.assignment')}</Translation>,
        //   path: SiteMap.Assessment.Assignment.path,
        //   id: SiteMap.Assessment.Assignment.menu,
        //   key: SiteMap.Assessment.Assignment.menu,
        //   icon: <></>,
        // },
      ],
    },
  ].filter((item) => item.isShow);
};

export const menuPerson: IMenuIcon[] = [
  {
    path: SiteMap.Profile.Me.path,
    icon: <IconPerson />,
    key: SiteMap.Profile.menu,
    title: i18nContant('profile'),
  },
  {
    title: <Translation>{(t) => t('manage.posts.me')}</Translation>,
    path: SiteMap.Manage.PostsMe.path,
    key: SiteMap.Manage.PostsMe.path,
    icon: <IconBook />,
    isShow: ifAnyGranted(SiteMap.Manage.PostsMe.roles),
  },
  {
    title: <Translation>{(t) => t('manage.registration')}</Translation>,
    path: SiteMap.Manage.Registration.path,
    key: SiteMap.Manage.Registration.menu,
    icon: <IconPencil />,
    isShow: ifAnyGranted(SiteMap.Manage.Registration.roles),
  },

  {
    title: (
      <Translation>
        {(t) =>
          t(ifAnyGranted([RolesEnum.STUDENT]) ? 'manage.classes.student' : 'manage.classes.tutor')
        }
      </Translation>
    ),
    path: SiteMap.Manage.Classes.path,
    key: SiteMap.Manage.Classes.menu,
    icon: <IconClassesName />,
    isShow: ifAnyGranted(SiteMap.Manage.Classes.roles),
  },
  {
    path: '/setting',
    icon: <IconSetting />,
    key: 'setting',
    title: i18nContant('setting'),
  },
  // {
  //   path: '/builling',
  //   icon: <BillingIcon />,
  //   key: 'builling',
  //   title: 'Builling',
  // },
  {
    path: '/help',
    icon: <IconHelp />,
    key: 'help',
    title: i18nContant('Help'),
  },
  // {
  //   path: '/Pricing',
  //   icon: <IconDolar />,
  //   key: 'pricing',
  //   title: 'Pricing',
  // },

  // {
  //   path: '/FAQ',
  //   icon: <IconFAQ />,
  //   key: 'FAQ',
  //   title: 'FAQ',
  // },
  {
    path: '',
    icon: <IconLogout />,
    key: 'logout',
    title: i18nContant('logout'),
  },
];
