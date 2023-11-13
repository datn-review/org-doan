import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TLookForTutorContext = {};

const LookForTutorContext = createContext<TLookForTutorContext>(
  null as unknown as TLookForTutorContext,
);

export const useLookForTutorContext = () => {
  return useContext(LookForTutorContext);
};

export const LookForTutorProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <LookForTutorContext.Provider value={value as TLookForTutorContext}>
      {children}
    </LookForTutorContext.Provider>
  );
};
