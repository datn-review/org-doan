import { css } from '@emotion/css';
import { useGetUserAdminQuery, useLazyGetUserAdminQuery } from '@org/store/src/services/users.api';
import dayjs from 'dayjs';
import { UpsertUser } from '../../organisms/up-sert-user';
import {
  BoxCenter,
  Button,
  IconDeleteAction,
  IconEditAction,
  Input,
  Pagination,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  useTable,
} from '@org/ui';
import { COLOR, COLOR_RGB, SiteMap, StatusEnum, StatusEnumColor, statusOption } from '@org/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch } from '@org/store';
import { useWebAdminContext } from './web-admin.context';
import Upsert from './up-sert/Upsert';
import { useCRUDContext, useUpdateEffect } from '@org/core';

function WebAdmin() {
  const tableInstance = useTable({});
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch } = useCRUDContext();

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    name: '',
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Users.menu }));
  }, []);

  const [getUser, { data, isLoading }] = useLazyGetUserAdminQuery();
  const query = {
    page: tableInstance.values.pagination.currentPage,
    limit: tableInstance.limit,
    status: filter.status,
    searchName: filter.name,
  };
  useEffect(() => {
    getUser(query);
  }, [JSON.stringify(query)]);

  useUpdateEffect(() => {
    if (isFetch) {
      getUser({
        ...query,
        page: 1,
      });
      tableInstance.reset();
      setIsFetch(false);
    }
  }, [isFetch]);

  const columns = [
    {
      key: 'firstName',
      title: t('user.fullname'),
      dataIndex: 'firstName',
      render: (_: string, record: any) => (
        <>
          {record?.lastName} {record?.firstName}
        </>
      ),
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('user.createdAt'),
      dataIndex: 'createdAt',
      render: (_createdAt: string) => <>{dayjs(_createdAt).format('DD/MM/YYYY')}</>,
    },
    {
      title: t('user.status'),
      dataIndex: '',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={StatusEnumColor[record?.status?.name as keyof typeof StatusEnumColor]}>
          {t(record?.status?.name)}
        </Tag>
      ),
    },

    {
      title: t('user.action'),
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
          <IconEditAction
            onClick={() => {
              setIsUpsert(true);
              setIdEdit(record.id);
            }}
          />
          <IconDeleteAction
            onClick={() => {
              console.log('DELETE');
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Space>
      <Space
        className={css`
          padding-bottom: 2rem;
          border-bottom: 1px solid #bcbcbc71;
          margin-bottom: 3rem;
        `}
      >
        <Space
          className={css`
            font-size: 1.8rem;
            margin: 0 0 1.5rem;
            font-weight: 500;
          `}
        >
          Search Filter
        </Space>
        <Select
          label={'Status'}
          options={statusOption}
          defaultValue={StatusEnum.active}
          value={filter.status}
          onChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
          className={css`
            min-width: 20rem;
            min-height: 3.8rem;
          `}
        />
      </Space>
      <Space
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        `}
      >
        <SelectLimitTable
          defaultValue={tableInstance.limit}
          onChange={tableInstance.onChangeLimit}
        />

        <Space
          className={css`
            gap: 0.5rem;
            display: flex;
            align-items: center;
          `}
        >
          <Space
            className={css`
              width: 18rem;
            `}
          >
            <Input
              name='seach_name'
              onChange={(value) => setFilter((prev) => ({ ...prev, name: String(value) }))}
              value={filter.name}
              placeholder='Search Name'
              className={css`
                margin-bottom: 0;
              `}
            />
          </Space>

          <Button onClick={() => setIsUpsert(true)}>{t('user.add.title')}</Button>
        </Space>
      </Space>
      <Table
        tableInstance={tableInstance}
        totalPage={data?.totals}
        columns={columns}
        data={data?.data}
        loading={isLoading}
      />
      <Upsert />
    </Space>
  );
}

export default WebAdmin;