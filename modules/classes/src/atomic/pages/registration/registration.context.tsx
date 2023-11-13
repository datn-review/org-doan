import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TRegistrationContext = {};

const RegistrationContext = createContext<TRegistrationContext>(
  null as unknown as TRegistrationContext,
);

export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};

export const RegistrationProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <RegistrationContext.Provider value={value as TRegistrationContext}>
      {children}
    </RegistrationContext.Provider>
  );
};
