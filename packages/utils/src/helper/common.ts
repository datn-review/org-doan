import { TTypeofValue } from '../type';

export const typeofValue = (value: unknown) => {
  return Object.prototype.toString.call(value).slice(8, -1) as TTypeofValue;
};

export const IIFE = <T extends (...args: any) => any>(cb: T): ReturnType<T> => {
  return cb();
};
export const mergeClassName = (...classNames: any[]): string => {
  return classNames.filter((className) => Boolean(className)).join(' ');
};
export const handleExecuteEvent = <T>(isExecute: unknown, fn: T): T | VoidFunction => {
  if (isExecute) {
    return fn;
  }

  return () => null;
};
export const getImage = (id: string) => {
  return `https://drive.google.com/uc?export=view&id=${id}`;
};
export const formatData = ({ data, name = 'name' }: any) => {
  if (!data) return [];
  return data?.map((item: any) => ({
    value: item?.id,
    label: item[name],
  }));
};
