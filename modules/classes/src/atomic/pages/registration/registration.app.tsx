import { css } from '@emotion/css';
import { useCRUDContext, useMessage, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { clearActiveMenu, setActiveGroup, setActiveSubGroup, useAppDispatch } from '@org/store';
import {
  useDeleteRegistrationMutation,
  useLazyGetRegistrationQuery,
} from '@org/store/src/services/registration.api';
import {
  Button,
  Dropdown,
  EllipsisOutlined,
  EyeOutlined,
  H2,
  IconDeleteAction,
  IconEditAction,
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
  COLOR,
  SiteMap,
  StatusEnum,
  StatusEnumColor,
  StatusRegistration,
  StatusRegistrationColor,
  StatusShowHide,
  StatusShowHideColor,
  colorRandom,
  statusOption,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Link } from 'react-router-dom';
import { Contants, EnumTypeContact } from '../../molecules';

function Registration() {
  const [contants, setContants] = useState<any>(null);

  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { messageSuccess, contextHolder } = useMessage();

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

  const [getUser, { data, isLoading }] = useLazyGetRegistrationQuery();
  const [deleteUser] = useDeleteRegistrationMutation();

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
      title: t('requestSummaryVI'),
      dataIndex: 'updatedAt',
      sorter: true,

      render: (_: string, record: any) => <>{record?.posts?.requestSummaryVI}</>,
    },
    {
      title: t('subject'),
      dataIndex: 'subject',

      render: (_: string, record: any) => (
        <>
          {record?.posts?.subjects?.map((item: any) => (
            <Tag color={colorRandom()}>{getNameLanguage(item?.nameVI, item?.nameEN)}</Tag>
          ))}
        </>
      ),
    },
    {
      title: t('grade'),
      dataIndex: 'grade',

      render: (_: string, record: any) => (
        <>
          {record?.posts?.gradeLevels?.map((item: any) => (
            <Tag color={colorRandom()}>{getNameLanguage(item?.nameVI, item?.nameEN)}</Tag>
          ))}
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
      render: (_: any, record: any) => (
        <Tag
          color={StatusRegistrationColor[record?.status as keyof typeof StatusRegistrationColor]}
        >
          {t(StatusRegistration[record?.status as keyof typeof StatusRegistration])}
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
          <Dropdown
            className={css`
              cursor: pointer;
              * {
                font-size: 14px;
              }
            `}
            overlayClassName={css`
              width: 20rem;
            `}
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <Link
                      to={SiteMap.ClassNew.Details.generate(record?.posts.id || 0)}
                      className={css`
                        color: #5c5b68 !important;
                      `}
                    >
                      Xem Chi Tiết Yêu Cầu
                    </Link>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <Space>
                      <If condition={record?.status === 1}>
                        <Then>
                          <Space onClick={() => setContants(record)}>
                            Hợp Đồng Đang Chờ Bạn Ký
                          </Space>
                        </Then>
                        <Else>
                          <If condition={record.status === 3}>
                            <Then>
                              <Space
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
                              >
                                Xóa yêu cầu
                              </Space>
                            </Then>
                            <Else>Xem Chi tiết Hợp Đồng</Else>
                          </If>
                        </Else>
                      </If>
                    </Space>
                  ),
                },
              ],
            }}
            trigger={['click']}
            placement='bottomCenter'
            arrow={{ pointAtCenter: true }}
          >
            <EllipsisOutlined
              className={css`
                transform: scale(1.6);
              `}
            />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <SectionLayout>
      {contextHolder}
      <Section>
        <H2>{t('registration')}</H2>
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
        <Contants
          type={EnumTypeContact.TutorSignature}
          data={contants}
          close={() => setContants(null)}
          refetch={() => {
            // getUser(id);
          }}
        />
      </Section>
    </SectionLayout>
  );
}

export default Registration;
