import React, { PropsWithChildren, createContext, useContext } from "react";

export type TRegisterContext = {};

const RegisterContext = createContext<TRegisterContext>(
  null as unknown as TRegisterContext
);

export const useHomeContext = () => {
  return useContext(RegisterContext);
};

export const RegisterProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <RegisterContext.Provider value={value as TRegisterContext}>
      {children}
    </RegisterContext.Provider>
  );
};
