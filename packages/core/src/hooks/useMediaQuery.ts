import { MediaEnum } from '@org/utils';
import { useEffect, useState } from 'react';
export const ResponsiveSize = {
  desktopWidth: 1200,
  tabletWidth: 992,
  mobileWidth: 768,
  mobileHWidth: 576,
};

function useMediaQuery() {
  const queries = [
    `(min-width: ${ResponsiveSize.desktopWidth + 1}px)`,
    `(min-width: ${ResponsiveSize.tabletWidth + 1}px)`,
    `(min-width: ${ResponsiveSize.mobileWidth + 1}px)`,
    `(min-width: ${ResponsiveSize.mobileHWidth + 1}px)`,
    `(min-width: ${ResponsiveSize.mobileHWidth + 1}px)`,
    `(min-width: ${0}px)`,
  ];

  const values = [
    MediaEnum.Desktop,
    MediaEnum.Tablet,
    MediaEnum.MiniTablet,
    MediaEnum.Phone,
    MediaEnum.Phone,
    MediaEnum.Phone,
  ];

  const defaultValue = ' mobile-h ';

  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };
  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [], // Empty array ensures effect is only run on mount and unmount
  );
  return value;
}

export default useMediaQuery;
