import { PropsWithChildren, createContext, useContext } from 'react';

export type TAssignmentContext = {};

const AssignmentContext = createContext<TAssignmentContext>(null as unknown as TAssignmentContext);

export const useAssignmentContext = () => {
  return useContext(AssignmentContext);
};

export const AssignmentProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <AssignmentContext.Provider value={value as TAssignmentContext}>
      {children}
    </AssignmentContext.Provider>
  );
};
