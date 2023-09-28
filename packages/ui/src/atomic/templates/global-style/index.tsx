import React, { PropsWithChildren } from "react";
import { Wrapper } from "./styled";

export function GlobalStyle({ children }: PropsWithChildren) {
  return <Wrapper>{children}</Wrapper>;
}
