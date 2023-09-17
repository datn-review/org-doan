import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout, MainLayout } from '@components/templates';
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
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
