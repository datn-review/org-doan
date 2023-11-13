import React, {
  Dispatch,
  PropsWithChildren,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type TCRUDContext = {
  isUpsert: boolean;
  setIsUpsert: Dispatch<SetStateAction<boolean>>;
  idEdit: number;
  setIdEdit: Dispatch<SetStateAction<number>>;
  setIsFetch: Dispatch<SetStateAction<boolean>>;
  isFetch: boolean;
  close: () => void;
  dataUpsert: any;
  setDataUpsert: Dispatch<SetStateAction<object>>;
};

const CRUDContext = createContext<TCRUDContext>({
  isUpsert: false,
  setIsUpsert: null,
  idEdit: 0,
  setIdEdit: null,
  isFetch: false,
  setIsFetch: null,
  close: null,
  dataUpsert: {},
  setDataUpsert: null,
} as unknown as TCRUDContext);

export const useCRUDContext = () => {
  return useContext(CRUDContext);
};

export const CRUDProvider = ({ children }: PropsWithChildren) => {
  const [isUpsert, setIsUpsert] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [isFetch, setIsFetch] = useState(false);
  const [dataUpsert, setDataUpsert] = useState({});

  const close = () => {
    setIsUpsert(false);
    setIdEdit(0);
  };

  const value = {
    isUpsert,
    setIsUpsert,
    idEdit,
    setIdEdit,
    isFetch,
    setIsFetch,
    close,
    dataUpsert,
    setDataUpsert,
  };

  if (!value) return <>Loading...</>;

  return <CRUDContext.Provider value={value as TCRUDContext}>{children}</CRUDContext.Provider>;
};
