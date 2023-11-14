import type { ReactNode } from 'react';
import { useCallback } from 'react';
import type { IPropsPortal } from '../portal-provider.type';
import { MaskModal } from '../variants/mask-modal';
import { usePortalContext } from '../portal-provider';

export type TModalProps = IPropsPortal & {
  isCloseMask?: boolean;
};

export const useModal = () => {
  const { openPortal, closePortal: close, destroyPortal: destroy } = usePortalContext();

  const open = useCallback((modal: ReactNode, props: TModalProps = {}) => {
    const { isCloseMask, ...portalProps } = props;

    openPortal(
      (portals: ReactNode[]) => (
        <MaskModal
          zIndex={(portals.length + 1) * 1000}
          isCloseMask={isCloseMask}
        >
          {modal}
        </MaskModal>
      ),
      portalProps,
    );
  }, []);

  return {
    open,
    close,
    destroy,
  };
};
