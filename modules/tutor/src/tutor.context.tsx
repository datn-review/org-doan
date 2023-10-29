import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TTutorContext = {};

const TutorContext = createContext<TTutorContext>(null as unknown as TTutorContext);

export const useTutorContext = () => {
  return useContext(TutorContext);
};

export const TutorProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return <TutorContext.Provider value={value as TTutorContext}>{children}</TutorContext.Provider>;
};
