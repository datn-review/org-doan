import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TStudentsContext = {};

const StudentsContext = createContext<TStudentsContext>(null as unknown as TStudentsContext);

export const useStudentsContext = () => {
  return useContext(StudentsContext);
};

export const StudentsProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <StudentsContext.Provider value={value as TStudentsContext}>
      {children}
    </StudentsContext.Provider>
  );
};
