import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TClassNewContext = {};

const ClassNewContext = createContext<TClassNewContext>(null as unknown as TClassNewContext);

export const useClassNewContext = () => {
  return useContext(ClassNewContext);
};

export const ClassNewProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ClassNewContext.Provider value={value as TClassNewContext}>
      {children}
    </ClassNewContext.Provider>
  );
};
