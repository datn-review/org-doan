import { Portal } from '@components/atoms/Portal';
import { ModalMask } from '@components/organisms/Modal/Mask';
import { createContext, Fragment, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface IPropsModal {
  domNode?: Element;
  isNested?: boolean | undefined;
  isCloseMask?: boolean;
}

interface IFnModal {
  open: (modal: ReactNode, propsModal?: IPropsModal) => void;
  destroy: VoidFunction;
  close: VoidFunction;
  isModalOpen: boolean;
}
interface IStateModal {
  modals: ReactNode[];
}
interface IModal extends IFnModal, IStateModal {}

export const ModalContext = createContext<IModal>(null as unknown as IModal);
ModalContext.displayName = 'ModalContext';

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Please add Provider ModalContext!!!');
  }

  return context;
};

function Modals() {
  const { modals } = useModalContext();

  return (
    <Fragment>
      {modals.map((modal, index) => {
        return <Fragment key={index}>{modal}</Fragment>;
      })}
    </Fragment>
  );
}
type PropsModalProvider = { children: ReactNode };
export const ModalProvider = ({ children }: PropsModalProvider) => {
  const [modals, setModals] = useState<ReactNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = useCallback((modal: ReactNode, props?: IPropsModal) => {
    setModals((prev) => {
      const modalPortal = (
        <Portal>
          <ModalMask
            zIndex={prev.length * 100}
            // eslint-disable-next-line react/prop-types
            isCloseMask={props?.isCloseMask}
          >
            {modal}
          </ModalMask>
        </Portal>
      );
      // eslint-disable-next-line react/prop-types
      if (props?.isNested) {
        return [...prev, modalPortal];
      }
      setIsModalOpen(true);
      return [modalPortal];
    });
  }, []);

  const destroy = useCallback(() => {
    setIsModalOpen(false);
    setModals([]);
  }, []);

  const removeLastModal = useCallback(() => {
    setModals((prev) => {
      return prev.slice(0, -1);
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        open,
        destroy,
        modals,
        isModalOpen,
        close: removeLastModal,
      }}
    >
      {children}
      <Modals />
    </ModalContext.Provider>
  );
};
