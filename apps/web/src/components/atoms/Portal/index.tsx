import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  domNode?: Element;
};

export function Portal({ children, domNode = document.body }: Props) {
  const refModal = useRef<HTMLElement>(document.createElement('div'));

  useEffect(() => {
    domNode.append(refModal.current);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      domNode.removeChild(refModal.current);
    };
  }, []);
  return createPortal(children, refModal.current as HTMLElement);
}
