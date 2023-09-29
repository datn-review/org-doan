import React, { PropsWithChildren, createContext, useContext } from "react";

export type TLoginContext = {};

const LoginContext = createContext<TLoginContext>(
  null as unknown as TLoginContext
);

export const useHomeContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <LoginContext.Provider value={value as TLoginContext}>
      {children}
    </LoginContext.Provider>
  );
};
