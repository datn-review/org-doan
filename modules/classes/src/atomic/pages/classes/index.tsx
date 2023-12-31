import {
  clearActiveMenu,
  setActiveGroup,
  setActiveSubGroup,
  useAppDispatch,
  useLazyGetClassesQuery,
} from '@org/store';

import { css } from '@emotion/css';
import { TagsList, useCRUDContext, useMessageHook, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  BoxCenter,
  Dropdown,
  EllipsisOutlined,
  H2,
  IconEye,
  Input,
  Section,
  SectionLayout,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  useTable,
} from '@org/ui';
import {
  colorRandom,
  EnumStatusCollap,
  SiteMap,
  StatusEnum,
  statusOption,
  StatusRegistration,
  StatusRegistrationColor,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { If, Then } from 'react-if';

export function ClassesPage() {
  const [contants, setContants] = useState<any>(null);

  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
  });
  console.log(Number('t'));
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessageHook();

  const { setIdEdit, setIsUpsert, isFetch, setIsFetch, isUpsert } = useCRUDContext();

  const [filter, setFilter] = useState({
    status: StatusEnum.all,
    name: '',
  });

  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Manage.menu }));
    dispatch(setActiveSubGroup({ current: SiteMap.Manage.Registration.menu }));
    return () => {
      dispatch(clearActiveMenu());
    };
  }, []);

  const [getData, { data, isLoading }] = useLazyGetClassesQuery();

  console.log('data', data);

  const query = {
    page: tableInstance.values.pagination.currentPage,
    limit: tableInstance.limit,
    status: filter.status,
    searchName: filter.name,
    sortBy: tableInstance.values.sort.sortBy,
    sortDirection: tableInstance.values.sort.sortDirection,
  };

  useEffect(() => {
    getData(query);
  }, [JSON.stringify(query)]);

  useUpdateEffect(() => {
    if (isFetch) {
      getData({
        ...query,
        page: 1,
      });
      tableInstance.reset();
      setIsFetch(false);
    }
  }, [isFetch]);

  const confirmContract = (record: any) => () => {
    setContants(record);
  };

  const columns = [
    {
      title: t('summary'),
      dataIndex: 'requestSummaryVI',
      sorter: true,
      render: (_: string, record: any) => <>{record?.posts?.requestSummaryVI}</>,
    },
    {
      title: t('subject'),
      dataIndex: 'subject',

      render: (_: string, record: any) => (
        <>
          <TagsList
            data={record?.posts?.subjects}
            isReverse={true}
          />
        </>
      ),
    },
    {
      title: t('grade'),
      dataIndex: 'grade',

      render: (_: string, record: any) => (
        <>
          <TagsList data={record?.posts?.gradeLevels} />
        </>
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
      render: (_: any, record: any) => {
        let status = record?.status;
        if (
          status === 5 &&
          record.contractEndDate &&
          dayjs(record.contractEndDate).isBefore(dayjs())
        ) {
          status = 6;
        }

        return (
          <Tag color={StatusRegistrationColor[status as keyof typeof StatusRegistrationColor]}>
            {t(StatusRegistration[status as keyof typeof StatusRegistration])}
          </Tag>
        );
      },
    },

    {
      title: t('user.action'),
      dataIndex: '',
      align: 'center',
      render: (_: any, record: any) => (
        <BoxCenter>
          <Link
            to={SiteMap.Manage.Classes.Details.generate(record?.id || 0)}
            className={css`
              color: #5c5b68 !important;
            `}
          >
            <IconEye />
          </Link>
        </BoxCenter>
        // <Space
        //   className={css`
        //     display: flex;
        //     align-items: center;
        //     gap: 0.5rem;
        //     cursor: pointer;
        //   `}
        // >
        //   <Dropdown
        //     className={css`
        //       cursor: pointer;
        //       * {
        //         font-size: 14px;
        //       }
        //     `}
        //     overlayClassName={css`
        //       width: 20rem;
        //     `}
        //     menu={{
        //       items: [
        //         {
        //           key: '1',
        //           label: (
        //             <Link
        //               to={SiteMap.Manage.Classes.Details.generate(record?.id || 0)}
        //               className={css`
        //                 color: #5c5b68 !important;
        //               `}
        //             >
        //               {t("class.details")}
        //             </Link>
        //           ),
        //         },
        //       ],
        //     }}
        //     trigger={['click']}
        //     placement='bottomCenter'
        //     // arrow={{ pointAtCenter: true }}
        //   >
        //     <EllipsisOutlined
        //       className={css`
        //         transform: scale(1.6);
        //       `}
        //     />
        //   </Dropdown>
        // </Space>
      ),
    },
  ];

  return (
    <SectionLayout>
      {contextHolder}
      <Section>
        <H2>{t('class.my')}</H2>

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
            <Select
              options={statusOption}
              defaultValue={StatusEnum.active}
              value={filter.status}
              onChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
              className={css`
                min-width: 20rem;
                min-height: 3.8rem;
              `}
            />
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
    </SectionLayout>
  );
}
