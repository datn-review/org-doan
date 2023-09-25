import type { PropsWithChildren, ReactNode } from "react";
import { createContext, Fragment, useContext, useMemo } from "react";
import { type IFnModal } from "./portal-provider.type";
import { usePortalProvider } from "./use-portal-provider";

const PortalContext = createContext<IFnModal>(null as unknown as IFnModal);
PortalContext.displayName = "PortalContext";

export const usePortalContext = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("Please add Provider ModalContext!!!");
  }

  return context;
};

function Portals({ portals }: { portals: ReactNode[] }) {
  return (
    <Fragment>
      {portals.map((portal, index) => {
        return <Fragment key={index}>{portal}</Fragment>;
      })}
    </Fragment>
  );
}

export const PortalProvider = ({ children }: PropsWithChildren) => {
  const { portals, openPortal, closePortal, destroyPortal } =
    usePortalProvider();

  const value = useMemo(() => {
    return {
      openPortal,
      destroyPortal,
      closePortal,
    };
  }, [openPortal, closePortal, destroyPortal]);

  return (
    <PortalContext.Provider value={value}>
      {children}
      <Portals portals={portals} />
    </PortalContext.Provider>
  );
};
