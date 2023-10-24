import { PropsWithChildren, createContext, useContext } from 'react';

export type TSkillsContext = {};

const SkillsContext = createContext<TSkillsContext>(null as unknown as TSkillsContext);

export const useSkillsContext = () => {
  return useContext(SkillsContext);
};

export const SkillsProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <SkillsContext.Provider value={value as TSkillsContext}>{children}</SkillsContext.Provider>
  );
};
