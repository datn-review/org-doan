import { PropsWithChildren, createContext, useContext } from 'react';

export type TSubjectContext = {};

const SubjectContext = createContext<TSubjectContext>(null as unknown as TSubjectContext);

export const useSubjectContext = () => {
  return useContext(SubjectContext);
};

export const SubjectProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <SubjectContext.Provider value={value as TSubjectContext}>{children}</SubjectContext.Provider>
  );
};
