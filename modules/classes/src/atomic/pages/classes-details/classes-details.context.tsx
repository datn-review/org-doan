import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TClassesDetailsContext = {};

const ClassesDetailsContext = createContext<TClassesDetailsContext>(
  null as unknown as TClassesDetailsContext,
);

export const useClassesDetailsContext = () => {
  return useContext(ClassesDetailsContext);
};

export const ClassesDetailsProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ClassesDetailsContext.Provider value={value as TClassesDetailsContext}>
      {children}
    </ClassesDetailsContext.Provider>
  );
};
