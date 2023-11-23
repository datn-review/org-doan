import { RolesEnum } from '../roles/roles';

export const SiteMap = {
  Home: {
    path: '/',
    menu: 'home',
  },
  Auth: {
    Login: {
      path: '/login',
    },
    Register: {
      path: '/register',
    },
    ForgotPassword: {
      path: '/forgot-password',
    },
    roles: [],
  },
  Dashboard: {
    path: '/dashboard',
    menu: 'dashboard',
    roles: [RolesEnum.CENTER_ADMIN, RolesEnum.WEB_ADMIN],
  },
  Users: {
    menu: 'users',
    Admin: {
      path: 'users/admin',
      menu: 'users/admin',
      ADD: 'users/admin/create/:id',
      EDIT: 'users/admin/edit/:id',
      DETAILS: 'users/admin/details/:id',
      roles: [RolesEnum.WEB_ADMIN],
    },
    Staff: {
      path: 'users/staff',
      menu: 'users/staff',
      roles: [RolesEnum.WEB_ADMIN, RolesEnum.WEB_STAFF],
    },
    CenterAdmin: {
      path: 'users/center-admin',
      menu: 'users/center-admin',
      roles: [RolesEnum.WEB_ADMIN, RolesEnum.WEB_STAFF, RolesEnum.CENTER_ADMIN],
    },
    CenterStaff: {
      path: 'users/center-staff',
      menu: 'users/center-staff',
      roles: [RolesEnum.WEB_ADMIN, RolesEnum.WEB_STAFF, RolesEnum.CENTER_ADMIN],
    },
    CenterTutor: {
      path: 'users/center-tutor',
      menu: 'users/center-tutor',
      roles: [RolesEnum.WEB_ADMIN, RolesEnum.WEB_STAFF, RolesEnum.CENTER_ADMIN],
    },
    PesonalTutor: {
      path: 'users/pesonal-tutor',
      menu: 'users/pesonal-tutor',
      roles: [RolesEnum.WEB_ADMIN, RolesEnum.WEB_STAFF],
    },
    Parent: {
      path: 'users/parent',
      menu: 'users/parent',
      roles: [RolesEnum.WEB_ADMIN, RolesEnum.WEB_STAFF],
    },
    Student: {
      path: 'users/student',
      menu: 'users/student',
      roles: [
        RolesEnum.WEB_ADMIN,
        RolesEnum.CENTER_TUTOR,
        RolesEnum.CENTER_ADMIN,
        RolesEnum.WEB_STAFF,
        RolesEnum.PARENT,
        RolesEnum.PESONAL_TUTOR,
      ],
    },
  },
  Settings: {
    menu: 'settings',
    GradeLevel: {
      path: 'settings/grade-level',
      menu: 'settings/grade-level',
      roles: [RolesEnum.WEB_ADMIN],
    },
    Subject: {
      path: 'settings/subject',
      menu: 'settings/subject',
      roles: [RolesEnum.WEB_ADMIN],
    },
    Certification: {
      path: 'settings/certification',
      menu: 'settings/certification',
      roles: [RolesEnum.WEB_ADMIN],
    },
    Skills: {
      path: 'settings/skills',
      menu: 'settings/skills',
      roles: [RolesEnum.WEB_ADMIN],
    },
  },
  Profile: {
    Me: {
      path: '/profile',
    },
    generate: (id: number | string) => `/profile/${id}`,
    path: '/profile/:id',
    menu: 'profile',
    roles: [],
  },
  Tutor: {
    path: '/tutor',
    menu: 'tutor',
    roles: [],
  },

  LookForTutor: {
    path: '/look-for-tutor',
    menu: 'look-for-tutor',
    roles: [],
  },
  TutorClass: {
    path: '/tutor-class',
    menu: 'manage-class',
    roles: [],
  },
  ClassNew: {
    path: '/class-new',
    menu: 'class-new',
    roles: [],
    Details: {
      generate: (id: number | string) => `/class-new/${id}`,
      path: '/class-new/:id',
      roles: [],
    },
  },
  Manage: {
    menu: 'Manage',
    roles: [],
    Registration: {
      path: '/registration',
      menu: 'registration',
      roles: [],
      Details: {
        generate: (id: number | string) => `/registration/${id}`,
        path: '/registration/:id',
        roles: [],
      },
    },
    PostsMe: {
      path: '/posts-me',
      menu: 'posts-me',
      roles: [],
    },
    RegistrationPost: {
      path: '/registration-post',
      menu: 'registration-post',
      roles: [],
    },
    Classes: {
      path: '/classes',
      menu: 'classes',
      roles: [],
      Details: {
        generate: (id: number | string) => `/classes/${id}`,
        path: '/classes/:id',
        menu: 'classes',
      },
    },
  },
  Pay: {
    Return: {
      path: '/returnPayVN',
      roles: [],
    },
  },
  Assessment: {
    path: '/',
    roles: [],
    menu: 'assessments',
    Exercise: {
      path: '/exercise',
      roles: [],
      menu: 'assessments/exercise',
    },
    Questions: {
      path: '/questions',
      roles: [],
      menu: 'assessments/questions',
    },
    Assignment: {
      path: '/assignment',
      roles: [],
      menu: 'assessments/assignment',
      Create: {
        path: '/assignment/create/:lessonId',
        generate: (id: number | string) => `/assignment/create/${id}`,
      },
      Do: {
        path: '/assignment/do/:assignmentId',
        generate: (id: number | string) => `/assignment/do/${id}`,
      },
    },
  },
};
