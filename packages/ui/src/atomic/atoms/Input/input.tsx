import React, { ComponentType, FormEvent, HTMLAttributes } from "react";
import { withForm } from "../../../form";

export function Input(
  props: HTMLAttributes<HTMLInputElement> & {
    onChange: (value: string) => void;
    value?: any;
  }
) {
  return (
    <input
      {...props}
      onChange={(e: FormEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e.target?.value);
      }}
      value={props.value && props.value}
    />
  );
}

export const InputForm = withForm<any>(Input);
