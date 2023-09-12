import React from 'react';
interface IProps {
  title?: string;
}
function Header({ title }: IProps) {
  return (
    <div className='flex justify-end absolute top-0 right-0'>
      <h1 className='py-[10px] px-[100px] font-bold border-[1px] border-gray-400  rounded-bl-3xl'>
        {title}
      </h1>
    </div>
  );
}

export default Header;
