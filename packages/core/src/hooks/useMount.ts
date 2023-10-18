import { useEffect } from 'react';
import _isFunction from 'lodash/isFunction';

const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (!_isFunction(fn)) {
      console.error(
        `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
      );
    }
  }

  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
