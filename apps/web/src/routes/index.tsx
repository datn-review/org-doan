import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '@components/templates';
import { HomePage } from '@org/home';
import { ConfirmEmailPage, LoginPage, RegisterPage } from '@org/auth';
import { SiteMap } from '@org/utils';
import { WebAdminPage } from '@org/users';
import { GradeLevelPage } from '@org/settings';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: SiteMap.Dashboard.path,
        element: <h1>Dashboard</h1>,
      },
      {
        path: SiteMap.Users.Admin.path,
        element: <WebAdminPage />,
      },
      {
        path: SiteMap.Settings.GradeLevel.path,
        element: <GradeLevelPage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/confirm-email/:hash',
        element: <ConfirmEmailPage />,
      },
    ],
  },
]);
