import React from 'react';
import * as S from './styled';
export type Option = {
  name: string;
  key: string | number;
  value: string | number;
};
interface IProps {
  options?: Option[];
  onChange: (value: string | number) => void;
  value: string | number;
  disabled?: boolean;
}
function Select({ options, onChange, value, disabled, ...rest }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <S.Select
      onChange={handleChange}
      value={value}
      disabled={disabled}
      {...rest}
    >
      {options?.map((option: Option) => (
        <option
          value={option.value}
          key={option.key}
        >
          {option.name}
        </option>
      ))}
    </S.Select>
  );
}

export default Select;
