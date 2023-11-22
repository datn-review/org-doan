import { Checkbox } from 'antd';
import { withForm } from '../../../form';
import { ReactNode } from 'react';

interface ICheckBox {
  labelCB?: ReactNode;
  disabled?: boolean;
  onChange?: any;
  name: string;
  value?: boolean;
  [k: string]: any;
}

export function CheckBox({ labelCB, disabled, onChange, value, ...props }: ICheckBox) {
  return (
    <Checkbox
      checked={value}
      disabled={disabled}
      onChange={onChange}
      {...props}
    >
      {labelCB}
    </Checkbox>
  );
}

export const CheckBoxForm = withForm<ICheckBox>(CheckBox);
