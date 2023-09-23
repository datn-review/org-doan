import React, { PropsWithChildren, createContext, useContext } from "react";

export type THomeContext = {};

const HomeContext = createContext<THomeContext>(
  null as unknown as THomeContext
);

export const useHomeContext = () => {
  return useContext(HomeContext);
};

export const HomeProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <HomeContext.Provider value={value as THomeContext}>
      {children}
    </HomeContext.Provider>
  );
};
