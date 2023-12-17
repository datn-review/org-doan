import React from 'react';
interface IProps {
  children: JSX.Element | any;
  className?: string;
}
export function BoxCenter({ children, className, ...rest }: IProps) {
  return (
    <div
      className={`flex justify-center items-center gap-2 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
export function BoxBetween({ children, className, ...rest }: IProps) {
  return (
    <div
      className={`flex justify-between items-center gap-2 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
export function BoxFlex({ children, className, ...rest }: IProps) {
  return (
    <div
      className={`flex justify-start items-center gap-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
