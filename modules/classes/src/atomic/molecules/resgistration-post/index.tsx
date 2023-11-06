import { css } from '@emotion/css';
import { useMessage } from '@org/core';
import { useTranslation } from '@org/i18n';
import { useAppDispatch } from '@org/store';
import {
  useDeleteRegistrationMutation,
  useLazyGetRegistrationByPostQuery,
  useLazyGetRegistrationQuery,
} from '@org/store/src/services/registration.api';
import { EyeOutlined, IconDeleteAction, ModalAntd, Space, Table, Tag, useTable } from '@org/ui';
import { SiteMap, StatusRegistration, StatusRegistrationColor } from '@org/utils';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function RegistrationPost({ id, close }: any) {
  const { messageSuccess, contextHolder } = useMessage();

  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [getUser, { data, isLoading }] = useLazyGetRegistrationByPostQuery();
  const [deleteUser] = useDeleteRegistrationMutation();
  useEffect(() => {
    getUser(id);
  }, [id]);
  const columns = [
    {
      title: t('tutor.name'),
      dataIndex: 'updatedAt',
      sorter: true,

      render: (_: string, record: any) => (
        <>
          {record?.user?.lastName} {record?.user?.firstName}
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
          <Link to={SiteMap.ClassNew.Details.generate(record?.posts?.id || 0)}>
            <EyeOutlined />
          </Link>
          {record?.status == 3 && (
            <IconDeleteAction
              onClick={() => {
                deleteUser(record.id)
                  .then((data) => {
                    messageSuccess(t('user.delete.success'));
                  })
                  .catch((error) => {
                    messageSuccess(t('user.delete.error'));
                  })
                  .finally(() => {});
              }}
            />
          )}
        </Space>
      ),
    },
  ];
  return (
    <ModalAntd
      title='Danh Sách Gia Sư Đăng Kí Nhận Dạy'
      open={!!id}
      onCancel={close}
      width={'999px'}
      footer={<></>}
    >
      <Table
        tableInstance={tableInstance}
        totalPage={data?.totals}
        columns={columns}
        data={data}
        loading={isLoading}
      />
    </ModalAntd>
  );
}
