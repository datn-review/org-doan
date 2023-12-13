import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import * as S from './styled';
// import { mergeClassName } from "@org/utils";
export enum VARIANT {
  Default = 'Default',
  Outlined = 'Outlined',
  Text = 'Text',
  Circle = 'Circle',
  Menu = 'Menu',

  // Tonal = "Tonal",
  // IconOnly = "IconOnly",
  // Icon = "Icon",
}
export enum TYPE_BUTTON {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Success = 'Success',
  Info = 'Info',
  Warning = 'Warning',
  Error = 'Error',
}
export enum SIZE {
  ExtraLarge = 'ExtraLarge',
  Large = 'Large',
  Normal = 'Normal',
  Small = 'Small',
  ExtraSmall = 'ExtraSmall',
  Menu = 'Menu',
}

export interface IButton {
  $variant?: VARIANT;
  $type?: TYPE_BUTTON;
  $size?: SIZE;
  className?: any;
}
export function Button({
  $variant = VARIANT.Default,
  $type = TYPE_BUTTON.Primary,
  $size = SIZE.Normal,
  children,
  className,
  ...rest
}: PropsWithChildren<IButton & ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <S.Button
      {...rest}
      $type={$type}
      $variant={$variant}
      $size={$size}
      className={className}

      // className={mergeClassName(S[$size])}
    >
      {children}
    </S.Button>
  );
}
