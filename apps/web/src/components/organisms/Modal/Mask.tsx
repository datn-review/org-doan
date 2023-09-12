import { useModalContext } from '@contexts/ModalContext';
import type { ReactNode } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

type Props = {
  children: ReactNode;
  isCloseMask: boolean | undefined;
  zIndex?: number;
};

export function ModalMask({ children, isCloseMask, zIndex }: Props) {
  const { close } = useModalContext();
  const [top, setTop] = useState(200);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isCloseMask) {
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
          case 'Escape': {
            close();
            break;
          }
          default:
            break;
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);
  useEffect(() => {
    const handleOnclick = (e: any) => {
      if (isFirst.current) {
        setTop(e?.clientY || 200);
        isFirst.current = false;
      }
    };
    document.addEventListener('click', handleOnclick);

    return () => {
      document.removeEventListener('click', handleOnclick);
    };
  }, []);

  return (
    <Fragment>
      <div
        className='absolute inset-0  bg-[#FFFFFFCC]'
        style={{ zIndex: zIndex ? zIndex + 9999 : 9999 }}
      />
      <Wrapper
        className={`fixed left-1/2 -translate-x-1/2 -translate-y-1/2`}
        style={{
          zIndex: zIndex ? zIndex + 10000 : 10000,
        }}
        top={top}
      >
        {children}
      </Wrapper>
    </Fragment>
  );
}
const Wrapper = styled.div<{ top: number }>`
  top: ${({ top }) => `${top}px`};
`;
