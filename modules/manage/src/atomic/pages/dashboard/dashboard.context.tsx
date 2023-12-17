import { PropsWithChildren, createContext, useContext } from 'react';

export type TDashboardContext = {};

const DashboardContext = createContext<TDashboardContext>(null as unknown as TDashboardContext);

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <DashboardContext.Provider value={value as TDashboardContext}>
      {children}
    </DashboardContext.Provider>
  );
};
