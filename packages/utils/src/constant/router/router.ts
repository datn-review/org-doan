import { RolesEnum } from "../roles/roles";

export const SiteMap = {
  Home: {
    path: "/",
    menu: "home",
  },
  Auth: {
    Login: {
      path: "/login",
    },
    Register: {
      path: "/register",
    },
    ForgotPassword: {
      path: "/forgot-password",
    },
    roles: [],
  },
  Dashboard: {
    path: "/dashboard",
    menu: "dashboard",
    roles: [RolesEnum.CENTER_ADMIN, RolesEnum.WEB_ADMIN],
  },
};
