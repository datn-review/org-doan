import React from 'react';
interface IProps {
  title?: string;
}
function Title({ title }: IProps) {
  return (
    <h2 className='pt-[10px] pb-[30px] pl-[5px] text-3xl border-b-[2px] border-gray-200 ml-[-5px]'>
      {title}
    </h2>
  );
}

export default Title;
