import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '@components/templates';
import { HomePage } from '@org/home';
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
        element: <h1>Login</h1>,
      },
      {
        path: '/register',
        element: <h1>Register</h1>,
      },
    ],
  },
]);
