import React, { ReactNode } from "react";
import * as S from "./styled";
export enum VARIANT {
  Primary,
  Secondary,
  Success,
  Danger,
  Warning,
  Info,
  Light,
  Dark,
}

type IButton = {
  $variant?: VARIANT;
  children: ReactNode;
  disabled?: boolean;
  [k: string]: any;
};
export function Button({
  $variant = VARIANT.Primary,
  children,

  ...rest
}: IButton) {
  return (
    <S.Button className="" {...rest} $variant={$variant}>
      {children}
    </S.Button>
  );
}
