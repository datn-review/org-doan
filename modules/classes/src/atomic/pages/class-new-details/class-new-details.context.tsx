import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TClassNewDetailsContext = {};

const ClassNewDetailsContext = createContext<TClassNewDetailsContext>(
  null as unknown as TClassNewDetailsContext,
);

export const useClassNewDetailsContext = () => {
  return useContext(ClassNewDetailsContext);
};

export const ClassNewDetailsProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ClassNewDetailsContext.Provider value={value as TClassNewDetailsContext}>
      {children}
    </ClassNewDetailsContext.Provider>
  );
};
