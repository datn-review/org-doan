import { Outlet } from 'react-router-dom';
import { Header } from '../../organisms/header';
import { Space } from '@org/ui';
import { css } from '@emotion/css';
export const MainLayout = () => {
  return (
    <>
      <Header />
      <Space
        className={css`
          background: #f7f6f9;
          min-height: calc(100vh - 6.5rem - 5.8rem);
          padding: 1.5rem;
        `}
      >
        <Outlet />
      </Space>
    </>
  );
};
