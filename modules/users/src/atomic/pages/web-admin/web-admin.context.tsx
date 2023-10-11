import React, {
  Dispatch,
  PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type TWebAdminContext = {
  isUpsert: boolean;
  setIsUpsert: Dispatch<SetStateAction<boolean>>;
  idEdit: number;
  setIdEdit: Dispatch<SetStateAction<number>>;
};

const WebAdminContext = createContext<TWebAdminContext>(null as unknown as TWebAdminContext);

export const useWebAdminContext = () => {
  return useContext(WebAdminContext);
};

export const WebAdminProvider = ({ children }: PropsWithChildren) => {
  const [isUpsert, setIsUpsert] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const value = { isUpsert, setIsUpsert, idEdit, setIdEdit };

  if (!value) return <>Loading...</>;

  return (
    <WebAdminContext.Provider value={value as TWebAdminContext}>
      {children}
    </WebAdminContext.Provider>
  );
};
