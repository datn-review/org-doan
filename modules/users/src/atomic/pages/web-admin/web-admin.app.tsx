import { css } from '@emotion/css';
import { useGetUserAdminQuery } from '@org/store/src/services/users.api';
import {
  BoxCenter,
  Button,
  IconDeleteAction,
  IconEditAction,
  Pagination,
  Select,
  Space,
  Table,
} from '@org/ui';
import React, { useState } from 'react';

function WebAdmin() {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetUserAdminQuery({
    page: currentPage,
    limit: limit,
  });
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: '',
      render: (_: any, record: any) => <>{record?.status?.name}</>,
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_: any, record: any) => (
        <Space
          className={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
          `}
        >
          <IconEditAction />
          <IconDeleteAction />
        </Space>
      ),
    },
  ];
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
    console.log('🚀 ~ file: web-admin.app.tsx:39 ~ onChange ~ pagination:', pagination);
  };
  console.log(data?.totals);

  return (
    <Space>
      <Space
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        `}
      >
        <Select
          defaultValue={limit}
          onChange={(value) => setLimit(value)}
          options={[
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
          ]}
          className={css`
            min-width: 6em;
            min-height: 3.8rem;
          `}
        />

        <Space
          className={css`
            gap: 0.5rem;
            display: flex;
            align-items: center;
          `}
        >
          Filter <Button>Add New User</Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data?.data}
        onChange={onChange}
        pagination={{ position: ['none'] }}
      />
      <Space
        className={css`
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Pagination
          defaultCurrent={currentPage}
          current={currentPage}
          onChange={(value) => setCurrentPage(value)}
          simple
          total={data?.totals}
        />
      </Space>
    </Space>
  );
}

export default WebAdmin;
