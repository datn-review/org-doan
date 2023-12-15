import { PropsWithChildren, createContext, useContext } from 'react';

export type TParentContext = {};

const ParentContext = createContext<TParentContext>(null as unknown as TParentContext);

export const useParentContext = () => {
  return useContext(ParentContext);
};

export const ParentProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ParentContext.Provider value={value as TParentContext}>{children}</ParentContext.Provider>
  );
};
