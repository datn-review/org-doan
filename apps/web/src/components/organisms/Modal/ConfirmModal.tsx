import { ReactComponent as CloseIcon } from '@assets/icon-svg/close.svg';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Button from '@components/atoms/Button';
import { TypeButton } from '@contants/type';
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface Props {
  onOk: VoidFunction;
  onCancel: VoidFunction;
  textOk: string;
  textCancel: string;
  title: string;
  content: string;
}

const focusable =
  'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';

export function ConfirmModal({ onOk, onCancel, textOk, textCancel, title, content }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const handleTabKey = (e: any) => {
    if (!ref.current) return;
    const focusableModalElements = ref.current.querySelectorAll(focusable);
    const firstElement = focusableModalElements[1];
    const elementClose = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement === lastElement) {
      (elementClose as HTMLElement).focus();
      return e.preventDefault();
    }
    if (!e.shiftKey && document.activeElement !== firstElement) {
      (firstElement as HTMLElement).focus();
      return e.preventDefault();
    }
  };

  const keyListenersMap = new Map([[9, handleTabKey]]);

  function keyListener(e: any) {
    const listener = keyListenersMap.get(e.keyCode);
    return listener && listener(e);
  }

  useEffect(() => {
    document.addEventListener('keydown', keyListener);
    return () => document.removeEventListener('keydown', keyListener);
  }, []);

  return (
    <WrapperModal
      className='bg-white'
      ref={ref}
    >
      <FormControl as='fieldset'>
        <FormLabel as='legend'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-1 flex-grow text-[28px] text-black font-semibold'>
              <h1>{title}</h1>
            </div>
            <ButtonClose
              className='cursor-pointer'
              onClick={onCancel}
              aria-label='Close'
            >
              <CloseIcon />
            </ButtonClose>
          </div>
          <div className='mt-[1.5rem] text-[16px] text-black font-medium w-[400px]'>{content}</div>
        </FormLabel>
        <div className={'flex justify-center gap-x-11 mt-[1.5rem]'}>
          <Button
            onClick={onOk}
            $type={TypeButton.Primary}
            ariaLabel={textOk}
            ariaDescribedby={textOk}
            title={textOk}
          />

          <Button
            onClick={onCancel}
            $type={TypeButton.Secondary}
            ariaLabel={textCancel}
            ariaDescribedby={textCancel}
            title={textCancel}
          />
        </div>
      </FormControl>
    </WrapperModal>
  );
}
const WrapperModal = styled.div`
  position: relative;
  max-width: 480px;
  width: calc(100vw - 10rem);
  margin: 0 auto;
  padding: 20px 40px;
  place-items: center;
  background-color: #fff;
  border: 1px solid #707070;
  border-top: 8px solid #3579c1;
  font-family: Roboto, sans-serif !important;
`;

const ButtonClose = styled.button`
  &:focus-visible {
    outline: none;
    svg {
      outline: 2px solid #4f7aa6 !important;
      box-shadow: none !important;
      outline-offset: 0px !important;
      border-radius: 0 !important;
    }
  }
`;
