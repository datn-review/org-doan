import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TTutorClassContext = {};

const TutorClassContext = createContext<TTutorClassContext>(null as unknown as TTutorClassContext);

export const useTutorClassContext = () => {
  return useContext(TutorClassContext);
};

export const TutorClassProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <TutorClassContext.Provider value={value as TTutorClassContext}>
      {children}
    </TutorClassContext.Provider>
  );
};
