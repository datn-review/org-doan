import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TWebAdminContext = {};

const WebAdminContext = createContext<TWebAdminContext>(null as unknown as TWebAdminContext);

export const useWebAdminContext = () => {
  return useContext(WebAdminContext);
};

export const WebAdminProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <WebAdminContext.Provider value={value as TWebAdminContext}>
      {children}
    </WebAdminContext.Provider>
  );
};
