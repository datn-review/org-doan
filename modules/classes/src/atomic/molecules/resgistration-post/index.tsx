import { css } from '@emotion/css';
import { useMessageHook, useModal } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useAppDispatch,
  useCreateCollaborationMutation,
  useLazyGetCollaborationByPostQuery,
} from '@org/store';
import {
  useDeleteRegistrationMutation,
  useLazyGetRegistrationByPostQuery,
  useLazyGetRegistrationQuery,
} from '@org/store/src/services/registration.api';
import {
  Button,
  Dropdown,
  EllipsisOutlined,
  EyeOutlined,
  FormProvider,
  IconDeleteAction,
  MenuProps,
  ModalAntd,
  RangePickerForm,
  Space,
  Table,
  Tag,
  useForm,
  useTable,
  yupResolver,
} from '@org/ui';
import { EnumStatusCollap, SiteMap, StatusRegistration, StatusRegistrationColor } from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Contants, EnumTypeContact } from '../contacts';
import { Payment } from '../payment';

type IUpdate = {
  time?: string;
};

const schema = yup.object({});
const dataInit: IUpdate = {
  time: undefined,
};

export function RegistrationPost({ id, close }: any) {
  const { messageSuccess, contextHolder } = useMessageHook();

  // const { open, close: closeModal } = useModal();
  const [contants, setIdContants] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    },
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [getUser, { data, isLoading }] = useLazyGetCollaborationByPostQuery();
  const [deleteUser] = useDeleteRegistrationMutation();
  useEffect(() => {
    getUser(id);
  }, [id]);

  const methods = useForm<IUpdate>({
    defaultValues: dataInit,
    resolver: yupResolver(schema),
  });

  const getItemsAction = (record: any) => {
    return [
      {
        key: '1',
        label: (
          <Link
            to={SiteMap.Profile.generate(record?.user?.id || 0)}
            className={css`
              color: #5c5b68 !important;
            `}
          >
            {t('tutor.details')}
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <Space onClick={() => setIdContants(record)}>
            {record?.status == EnumStatusCollap.Pending
              ? t('contact.student.confirm')
              : t('contact.title.link')}
          </Space>
        ),
      },

      {
        ...(record?.status == EnumStatusCollap.PendingPay && {
          key: '3',
          label: (
            <Space
              onClick={() => {
                console.log(record?.payment);
                const payment = [...record?.payment]?.sort((a: any, b: any) => a.id - b.id);

                console.log(payment);

                setPayment(payment?.[0]);
              }}
            >
              {t('contact.pay')}
            </Space>
          ),
        }),
      },
    ].filter(Boolean) as any[];
  };
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
      align: 'center',
      render: (_: any, record: any) => (
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
            items: getItemsAction(record),
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
      ),
    },
  ];

  return (
    <ModalAntd
      title={t('list.tutor.register')}
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
      <Contants
        type={EnumTypeContact.PostSignature}
        data={contants}
        close={() => setIdContants(null)}
        refetch={() => {
          getUser(id);
        }}
      />
      <Payment
        data={payment}
        close={() => setPayment(null)}
        refetch={() => {
          // getUser(id);
        }}
      />
    </ModalAntd>
  );
}
