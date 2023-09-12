import React from 'react';
import * as S from './styled';
import { TypeButton } from '@contants/type';
interface IProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  $type: TypeButton;

  [k: string]: any;
}

const Button = ({ title, onClick, $type = TypeButton.Primary, ...rest }: IProps) => {
  return (
    <S.Button
      className='px-3 py-1'
      $type={$type}
      onClick={onClick}
      {...rest}
    >
      {title}
    </S.Button>
  );
};
export default Button;
