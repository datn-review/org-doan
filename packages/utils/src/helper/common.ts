import { TTypeofValue } from "../type";

export const typeofValue = (value: unknown) => {
  return Object.prototype.toString.call(value).slice(8, -1) as TTypeofValue;
};

export const IIFE = <T extends (...args: any) => any>(cb: T): ReturnType<T> => {
  return cb();
};
export const mergeClassName = (...classNames: any[]): string => {
  return classNames.filter((className) => Boolean(className)).join(" ");
};
