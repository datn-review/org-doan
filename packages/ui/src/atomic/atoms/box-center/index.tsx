import React from 'react';
interface IProps {
  children: JSX.Element | any;
  className?: string;
}
export function BoxCenter({ children, className, ...rest }: IProps) {
  return (
    <div
      className={`flex justify-center items-center gpa-[.5rem] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
