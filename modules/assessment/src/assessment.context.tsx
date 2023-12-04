import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TAssessmentContext = {};

const AssessmentContext = createContext<TAssessmentContext>(null as unknown as TAssessmentContext);

export const useAssessmentContext = () => {
  return useContext(AssessmentContext);
};

export const AssessmentProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <AssessmentContext.Provider value={value as TAssessmentContext}>
      {children}
    </AssessmentContext.Provider>
  );
};
