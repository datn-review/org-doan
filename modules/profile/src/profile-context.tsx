import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TProfileContext = {};

const ProfileContext = createContext<TProfileContext>(null as unknown as TProfileContext);

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ProfileContext.Provider value={value as TProfileContext}>{children}</ProfileContext.Provider>
  );
};
