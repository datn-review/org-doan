import { Header } from "../../organisms/Header";
export const MainLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      {/* <Outlet /> */}
    </>
  );
};
