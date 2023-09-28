import React, { ComponentType, HTMLAttributes } from "react";
import { withForm } from "../../../form";

export function Input(
  props: ComponentType<any> & HTMLAttributes<HTMLInputElement>
) {
  return <input {...props} />;
}

export const InputForm = withForm<any>(Input);
