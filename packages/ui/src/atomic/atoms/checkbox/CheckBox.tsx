import { Checkbox } from "antd";
import { withForm } from "../../../form";
import { ReactNode } from "react";

interface ICheckBox {
  labelCB?: ReactNode;
  disabled?: boolean;
  onChange?: any;
  name: string;
  value?: boolean;
}

export function CheckBox({ labelCB, disabled, onChange, value }: ICheckBox) {
  return (
    <Checkbox checked={value} disabled={disabled} onChange={onChange}>
      {labelCB}
    </Checkbox>
  );
}

export const CheckBoxForm = withForm<ICheckBox>(CheckBox);
