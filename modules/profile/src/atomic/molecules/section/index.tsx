import { css } from '@emotion/css/macro';
import { Space, Tabs, TabsProps } from '@org/ui';
import { COLOR } from '@org/utils';
import React from 'react';
const contentStyle: React.CSSProperties = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};

function Section() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông Tin Cá Nhân',
      children: <Information />,
    },
    {
      key: '2',
      label: 'Kỹ Năng - Chứng Chỉ',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Các Lớp Đã dạy',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Đánh Giá',
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <Space
      className={css`
        /* padding: 2.4rem; */
        /* background-color: ${COLOR.White}; */
        margin-top: 2rem;
      `}
    >
      <Tabs
        defaultActiveKey='1'
        items={items}
        onChange={onChange}
      />
    </Space>
  );
}

export default Section;
const Information = () => {
  return <Space>Information</Space>;
};
