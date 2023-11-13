import { useEffect } from 'react';
import useLatest from './useLatest';
import _isFunction from 'lodash/isFunction';

const useUnmount = (fn: () => void) => {
  // if (import.meta.env.NODE_ENV === 'development') {
  //   if (!_isFunction(fn)) {
  //     console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
  //   }
  // }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};

export default useUnmount;
