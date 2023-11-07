import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TRegistrationPostContext = {};

const RegistrationPostContext = createContext<TRegistrationPostContext>(
  null as unknown as TRegistrationPostContext,
);

export const useRegistrationPostContext = () => {
  return useContext(RegistrationPostContext);
};

export const RegistrationPostProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <RegistrationPostContext.Provider value={value as TRegistrationPostContext}>
      {children}
    </RegistrationPostContext.Provider>
  );
};
