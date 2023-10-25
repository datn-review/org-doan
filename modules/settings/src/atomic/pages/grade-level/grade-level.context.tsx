import { PropsWithChildren, createContext, useContext } from 'react';

export type TGradeLevelContext = {};

const GradeLevelContext = createContext<TGradeLevelContext>(null as unknown as TGradeLevelContext);

export const useGradeLevelContext = () => {
  return useContext(GradeLevelContext);
};

export const GradeLevelProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <GradeLevelContext.Provider value={value as TGradeLevelContext}>
      {children}
    </GradeLevelContext.Provider>
  );
};
