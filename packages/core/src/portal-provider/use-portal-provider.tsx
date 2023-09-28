import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import type { IFnModal, IModal } from "./portal-provider.type";
import { Portal } from "./component";
import { flushSync } from "react-dom";

export const usePortalProvider = (): IModal => {
  const [portals, setPortals] = useState<ReactNode[]>([]);

  const openPortal: IFnModal["openPortal"] = useCallback((modal, props) => {
    setPortals((prev) => {
      const modalPortal = (
        <Portal domNode={props?.domNode}>
          {typeof modal === "function" ? modal(prev) : modal}
        </Portal>
      );

      if (props?.isNested) {
        return [...prev, modalPortal];
      }

      return [modalPortal];
    });
  }, []);

  const destroyPortal = useCallback(() => {
    flushSync(() => {
      setPortals([]);
    });
  }, []);

  const closePortal = useCallback(() => {
    flushSync(() => {
      setPortals((prev) => {
        return prev.slice(0, -1);
      });
    });
  }, []);

  return {
    portals,

    openPortal,
    destroyPortal,
    closePortal,
  };
};
