import { Outlet } from 'react-router-dom';
import { Header } from '@components/organisms/header-layout';
import { Space } from '@org/ui';
import { css } from '@emotion/css';
import { Footer } from '@components/organisms/footer';
export const MainLayout = () => {
  return (
    <>
      <Header />
      <Space
        className={css`
          background: #f7f6f9;
          min-height: calc(100vh - 6.5rem - 5.8rem - 46.5rem);
          padding: 1.5rem 0;
        `}
      >
        <Outlet />
      </Space>
      <Footer />
    </>
  );
};
