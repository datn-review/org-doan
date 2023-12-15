import { PropsWithChildren, createContext, useContext } from 'react';

export type TStaffContext = {};

const StaffContext = createContext<TStaffContext>(null as unknown as TStaffContext);

export const useStaffContext = () => {
  return useContext(StaffContext);
};

export const StaffProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return <StaffContext.Provider value={value as TStaffContext}>{children}</StaffContext.Provider>;
};
