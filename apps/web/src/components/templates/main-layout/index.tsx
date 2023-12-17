import { Link, Outlet } from 'react-router-dom';
import { ChatIcon, Space, Badge } from '@org/ui';
import { Header } from '@components/organisms/header-layout';
import { css } from '@emotion/css';
import { Footer } from '@components/organisms/footer';
import { SiteMap } from '@org/utils';
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

      <Space
        className={css`
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          border-radius: 50%;
          z-index: 999;
          /* border: 2px solid white; */
        `}
      >
        <Link to={SiteMap.Chat.path}>
          <Badge
          // count={10}
          // overflowCount={9}
          >
            <ChatIcon />
          </Badge>
        </Link>
      </Space>
    </>
  );
};
