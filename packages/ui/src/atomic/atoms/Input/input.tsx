import { css } from "@emotion/css";
import { FormEvent, HTMLAttributes } from "react";
import { withForm } from "../../../form";

export type IInput = HTMLAttributes<HTMLInputElement> & {
  name: string;
  onChange?: (value: string) => void;
  value?: any;
};

export function Input({ onChange, value, ...props }: IInput) {
  return (
    <input
      className={css`
        border: 0.1rem solid #c5c4c5;
        width: 100%;
        margin-bottom: 0.5rem;
        padding: 0.8rem 1rem;
        border-radius: 0.5rem;
        outline: none;
      `}
      {...props}
      onChange={(e: FormEvent<HTMLInputElement>) => {
        onChange && onChange(e.currentTarget.value);
      }}
      value={value && value}
    />
  );
}

export const InputForm = withForm<IInput>(Input);
