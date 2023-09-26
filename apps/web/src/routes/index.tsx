import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '@components/templates';
import { HomePage } from '@org/home';
import { LoginPage } from '@org/auth';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <h1>Dashboard</h1>,
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
        element: <h1>Register</h1>,
      },
    ],
  },
]);
