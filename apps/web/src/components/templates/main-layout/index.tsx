import { Outlet } from 'react-router-dom';
import { Header } from '../../organisms/header';
export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
