import { PropsWithChildren, createContext, useContext } from 'react';

export type TCertificationContext = {};

const CertificationContext = createContext<TCertificationContext>(
  null as unknown as TCertificationContext,
);

export const useCertificationContext = () => {
  return useContext(CertificationContext);
};

export const CertificationProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <CertificationContext.Provider value={value as TCertificationContext}>
      {children}
    </CertificationContext.Provider>
  );
};
