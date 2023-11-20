import { css } from '@emotion/css';
import { useCRUDContext, useMessageHook, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { clearActiveMenu, setActiveGroup, setActiveSubGroup, useAppDispatch } from '@org/store';
import { useDeleteQuestionMutation, useLazyGetQuestionQuery } from '@org/store';
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

function QuestionApp() {
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'content',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessageHook();

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch, isUpsert } = useCRUDContext();

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    name: '',
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Assessment.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Assessment.Questions.menu }));
    return () => {
      dispatch(clearActiveMenu());
    };
  }, []);

  const [getUser, { data, isLoading }] = useLazyGetQuestionQuery();
  const [deleteUser] = useDeleteQuestionMutation();

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
      key: 'content ',
      title: t('name'),
      dataIndex: 'content',
      sorter: true,
    },

    {
      key: 'gradeLevel',
      title: t('gradeLevel'),
      dataIndex: 'gradeLevel',
      sorter: true,
      render: (_createdAt: string, record: any) => (
        <Tag>{getNameLanguage(record?.gradeLevel.nameVI, record?.gradeLevel.nameEN)}</Tag>
      ),
    },

    {
      key: 'subject',
      title: t('subject'),
      dataIndex: 'subject',
      sorter: true,
      render: (_createdAt: string, record: any) => (
        <Tag>{getNameLanguage(record?.subject.nameVI, record?.subject.nameEN)}</Tag>
      ),
    },

    {
      title: t('user.createdAt'),
      dataIndex: 'updatedAt',
      sorter: true,

      render: (_createdAt: string) => <>{dayjs(_createdAt).format('DD/MM/YYYY')}</>,
    },
    {
      title: t('user.status'),
      sorter: true,

      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={StatusShowHideColor[record?.status as keyof typeof StatusShowHideColor]}>
          {t(StatusShowHide[record?.status as keyof typeof StatusShowHide])}
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
    <Section>
      {contextHolder}
      <Space
        className={css`
          padding-bottom: 2rem;
          border-bottom: 1px solid #bcbcbc71;
          margin-bottom: 3rem;
        `}
      >
        <H2>{t('settings.question')}</H2>

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
              placeholder={t('search.name')}
              className={css`
                margin-bottom: 0;
              `}
            />
          </Space>

          <Button onClick={() => setIsUpsert(true)}>{t('add')}</Button>
        </Space>
      </Space>
      <Table
        tableInstance={tableInstance}
        totalPage={data?.totals}
        columns={columns}
        data={data?.data}
        loading={isLoading}
      />

      {isUpsert && <Upsert />}
    </Section>
  );
}

export default QuestionApp;
