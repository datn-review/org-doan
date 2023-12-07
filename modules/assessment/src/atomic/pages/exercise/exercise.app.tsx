import { css } from '@emotion/css';
import { SelectGrade, useCRUDContext, useMessageHook, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { clearActiveMenu, setActiveGroup, setActiveSubGroup, useAppDispatch } from '@org/store';
import { useDeleteExerciseMutation, useLazyGetExerciseQuery } from '@org/store';
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
  colorRandom,
  RolesEnum,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Upsert } from './container/upsert';
import { ifAnyGranted } from '@org/auth';
import { ImportCSV } from './container/import-csv';
import { Crawl } from './container/crawl';

function ExerciseApp() {
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'name',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessageHook();
  const [openImport, setOpenImport] = useState(false);
  const [openCrawl, setOpenCrawl] = useState(false);

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch, isUpsert } = useCRUDContext();

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    name: '',
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Assessment.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Assessment.Exercise.menu }));
    return () => {
      dispatch(clearActiveMenu());
    };
  }, []);

  const [getUser, { data, isLoading }] = useLazyGetExerciseQuery();
  const [deleteUser] = useDeleteExerciseMutation();

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
      key: 'name ',
      title: t('name'),
      dataIndex: 'name',
      sorter: true,
    },

    {
      title: t('grade'),
      sorter: true,

      dataIndex: 'grade',
      key: 'grade',
      render: (_: any, record: any) => (
        <Tag color={colorRandom()}>
          {getNameLanguage(record?.gradeLevel?.nameVI, record?.gradeLevel?.nameEN)}
        </Tag>
      ),
    },
    {
      title: t('subject'),
      sorter: true,

      dataIndex: 'subject',
      key: 'grade',
      render: (_: any, record: any) => (
        <Tag color={colorRandom()}>
          {getNameLanguage(record?.subject?.nameVI, record?.subject?.nameEN)}
        </Tag>
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
        <H2>{t('assessment.exercise')}</H2>

        <Space
          className={css`
            display: flex;
            justify-content: flex-start;
          `}
        >
          {/*<SelectGrade />*/}
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
          {ifAnyGranted([RolesEnum.WEB_ADMIN]) && (
            <Button onClick={() => setOpenCrawl(true)}>{t('exercise.crawl')}</Button>
          )}
          <Button onClick={() => setOpenImport(true)}>{t('exercise.import')}</Button>
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
      {openImport && <ImportCSV close={() => setOpenImport(false)} />}
      {openCrawl && <Crawl close={() => setOpenCrawl(false)} />}
    </Section>
  );
}

export default ExerciseApp;
