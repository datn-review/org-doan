import { css, cx } from '@emotion/css';
import { COLOR } from '@org/utils';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { Space } from '../space';

export function Section({
  children,
  className,
  ...props
}: PropsWithChildren & HTMLAttributes<HTMLSpanElement>) {
  return (
    <Space
      className={cx('section', className)}
      {...props}
    >
      {children}
    </Space>
  );
}
export function SectionLayout({
  children,
  className,
  ...props
}: PropsWithChildren & HTMLAttributes<HTMLSpanElement>) {
  return (
    <Space
      className={cx('section-layout', className)}
      {...props}
    >
      {children}
    </Space>
  );
}
