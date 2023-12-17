import { PropsWithChildren, createContext, useContext } from 'react';

export type TPaymentContext = {};

const PaymentContext = createContext<TPaymentContext>(null as unknown as TPaymentContext);

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <PaymentContext.Provider value={value as TPaymentContext}>{children}</PaymentContext.Provider>
  );
};
