import { PropsWithChildren, createContext, useContext } from 'react';

export type TTutorsContext = {};

const TutorsContext = createContext<TTutorsContext>(null as unknown as TTutorsContext);

export const useTutorsContext = () => {
  return useContext(TutorsContext);
};

export const TutorsProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <TutorsContext.Provider value={value as TTutorsContext}>{children}</TutorsContext.Provider>
  );
};
