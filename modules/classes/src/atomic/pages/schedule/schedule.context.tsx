import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TScheduleContext = {};

const ScheduleContext = createContext<TScheduleContext>(null as unknown as TScheduleContext);

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};

export const ScheduleProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ScheduleContext.Provider value={value as TScheduleContext}>
      {children}
    </ScheduleContext.Provider>
  );
};
