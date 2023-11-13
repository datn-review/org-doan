import React, { PropsWithChildren, createContext, useContext } from "react";

export type TConfirmEmailContext = {};

const ConfirmEmailContext = createContext<TConfirmEmailContext>(
  null as unknown as TConfirmEmailContext
);

export const useConfirmEmailContext = () => {
  return useContext(ConfirmEmailContext);
};

export const ConfirmEmailProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ConfirmEmailContext.Provider value={value as TConfirmEmailContext}>
      {children}
    </ConfirmEmailContext.Provider>
  );
};
