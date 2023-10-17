import { useState, useCallback, useRef, useEffect } from 'react';

// prevent multiple submit
export default function useOnceFn(handler: any, timeout: number = 1000) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const savedHandler = useRef<any>();
  const timerId = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => () => {
      if (timerId.current) clearTimeout(timerId.current);
    },
    [],
  );

  const submit = useCallback(
    (...args: any) => {
      setIsSubmitting(true);
      savedHandler.current(...args);
      timerId.current = setTimeout(() => {
        setIsSubmitting(false);
      }, timeout);
    },
    [timeout],
  );

  return isSubmitting ? () => {} : submit;
}
