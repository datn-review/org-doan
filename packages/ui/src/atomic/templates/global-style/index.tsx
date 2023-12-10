import React, { PropsWithChildren } from 'react';
import { Wrapper } from './styled';
import './style.scss';
export function GlobalStyle({ children }: PropsWithChildren) {
  return <Wrapper>{children}</Wrapper>;
}
