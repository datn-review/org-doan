import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '@components/templates';
import { HomePage } from '@org/home';
import { ConfirmEmailPage, LoginPage, RegisterPage } from '@org/auth';
import { SiteMap } from '@org/utils';
import { WebAdminPage } from '@org/users';
import { CertificationPage, GradeLevelPage, SubjectPage, SkillsPage } from '@org/settings';
import { ProfilePage } from '@org/profile';

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
      {
        path: SiteMap.Settings.Certification.path,
        element: <CertificationPage />,
      },
      {
        path: SiteMap.Settings.Subject.path,
        element: <SubjectPage />,
      },
      {
        path: SiteMap.Settings.Skills.path,
        element: <SkillsPage />,
      },
      {
        path: SiteMap.Profile.path,
        element: <ProfilePage />,
      },
      {
        path: SiteMap.Profile.Me.path,
        element: <ProfilePage />,
      },
      {
        path: SiteMap.Profile.Me.path,
        element: <ProfilePage />,
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
