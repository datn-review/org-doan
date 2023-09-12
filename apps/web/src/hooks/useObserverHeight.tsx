import { useEffect } from 'react';

export const useObserverHeight = (scale: number, callBack: (height: number) => void) => {
  useEffect(() => {
    let prevHeight = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentHeight = entry.contentRect.height * scale;
        if (Math.abs(currentHeight - prevHeight) > 0.5) {
          callBack(currentHeight);
          prevHeight = currentHeight;
        }
      }
    });
    resizeObserver.observe(document.getElementById('gfw') as HTMLElement);
    return () => {
      resizeObserver.unobserve(document.getElementById('gfw') as HTMLElement);
    };
  });
};
