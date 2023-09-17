export const IIFE = (cb: Function) => {
  return cb();
};
export const mergeClassName = (...classNames: (string | boolean | null | undefined)[]): string => {
  return classNames.filter((className) => Boolean(className)).join(' ');
};
