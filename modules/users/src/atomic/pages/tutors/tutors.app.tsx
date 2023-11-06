import { css } from '@emotion/css';
import { useCRUDContext, useMessage, useUpdateEffect } from '@org/core';
import { useTranslation } from '@org/i18n';
import { clearActiveMenu, setActiveGroup, setActiveSubGroup, useAppDispatch } from '@org/store';
import { useDeleteUserTutorMutation, useLazyGetUserTutorQuery } from '@org/store';
import {
  Button,
  H2,
  IconDeleteAction,
  IconEditAction,
  Input,
  Section,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  useTable,
} from '@org/ui';
import {
  COLOR,
  SiteMap,
  StatusEnum,
  StatusEnumColor,
  StatusShowHide,
  StatusShowHideColor,
  statusOption,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Upsert } from './container/upsert';

function TutorsApp() {
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'lastName',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessage();

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch, isUpsert } = useCRUDContext();
  console.log('🚀 ~ file: tutors.app.tsx:45 ~ TutorsApp ~ isUpsert:', isUpsert);

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    name: '',
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Users.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Users.PesonalTutor.menu }));
    return () => {
      dispatch(clearActiveMenu());
    };
  }, []);

  const [getUser, { data, isLoading }] = useLazyGetUserTutorQuery();
  const [deleteUser] = useDeleteUserTutorMutation();

  const query = {
    page: tableInstance.values.pagination.currentPage,
    limit: tableInstance.limit,
    status: filter.status,
    searchName: filter.name,
    sortBy: tableInstance.values.sort.sortBy,
    sortDirection: tableInstance.values.sort.sortDirection,
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
      key: 'lastName',
      title: t('user.fullname'),
      dataIndex: 'lastName',
      sorter: true,
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
      sorter: true,
    },
    {
      title: t('user.createdAt'),
      dataIndex: 'createdAt',
      sorter: true,

      render: (_createdAt: string) => <>{dayjs(_createdAt).format('DD/MM/YYYY')}</>,
    },
    {
      title: t('user.status'),
      sorter: true,

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
              deleteUser(record.id)
                .then((data) => {
                  messageSuccess(t('user.delete.success'));
                })
                .catch((error) => {
                  messageSuccess(t('user.delete.error'));
                })
                .finally(() => {
                  setIsFetch(true);
                });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Space>
      {contextHolder}

      <Section>
        <H2>{t('manage.personal.tutor')}</H2>

        <Select
          label={t('user.status')}
          options={statusOption}
          defaultValue={StatusEnum.active}
          value={filter.status}
          onChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
          className={css`
            min-width: 20rem;
            min-height: 3.8rem;
          `}
        />
      </Section>
      <Section
        className={css`
          margin-top: 2rem;
        `}
      >
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
                placeholder={t('search_name')}
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
      </Section>
      {isUpsert && <Upsert />}
    </Space>
  );
}

export default TutorsApp;
