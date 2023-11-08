import { css } from '@emotion/css';
import { useMessage, useModal } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import { useAppDispatch, useCreateCollaborationMutation } from '@org/store';
import {
  useDeleteRegistrationMutation,
  useLazyGetRegistrationByPostQuery,
  useLazyGetRegistrationQuery,
} from '@org/store/src/services/registration.api';
import {
  Button,
  EyeOutlined,
  FormProvider,
  IconDeleteAction,
  ModalAntd,
  RangePickerForm,
  Space,
  Table,
  Tag,
  useForm,
  useTable,
  yupResolver,
} from '@org/ui';
import { SiteMap, StatusRegistration, StatusRegistrationColor } from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

type IUpdate = {
  time?: string;
};

const schema = yup.object({});
const dataInit: IUpdate = {
  time: undefined,
};

export function RegistrationPost({ id, close }: any) {
  const { messageSuccess, contextHolder } = useMessage();

  // const { open, close: closeModal } = useModal();
  const [contants, setIdContants] = useState<any>(null);

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

  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

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
          <Link to={SiteMap.Profile.generate(record?.user?.id || 0)}>
            <EyeOutlined />
          </Link>
          <Button onClick={() => setIdContants(record)}>Xác Nhận Giáo Viên Này</Button>
        </Space>
      ),
    },
  ];

  const [createCollaboration] = useCreateCollaborationMutation();
  const submitContact = (value: any) => {
    console.log('🚀 ~ file: index.tsx:124 ~ submitContact ~ value:', value);
    const tutor = contants?.user?.id;
    const startDate = dayjs(value?.time?.[0]);
    console.log('🚀 ~ file: index.tsx:127 ~ submitContact ~ startDate:', startDate);
    const endDate = dayjs(value?.time?.[1]);
    console.log('🚀 ~ file: index.tsx:128 ~ submitContact ~ endDate:', endDate);

    console.log('🚀 ~ file: index.tsx:126 ~ submitContact ~ tutor:', tutor);
    createCollaboration({
      tutor: contants?.user.id,
      startDate,
      endDate,
    });
  };
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
      <ModalAntd
        title=' Tiến Hành Hoán Tất Hợp đồng '
        open={!!contants}
        onCancel={() => setIdContants(null)}
        width={'90%'}
        className={css`
          top: 20px;
        `}
        footer={<></>}
      >
        Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến
        Hành Hoán Tất Hợp đồng Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
        labore cupiditate esse optio quam? Ab sit eos voluptate amet saepe est atque nemo, beatae
        iste assumenda dolorum fugiat, odit nam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Fuga molestiae nobis similique dignissimos, quasi consectetur. Ratione aut nisi ab,
        est excepturi illum repellat veritatis, tempora illo distinctio, accusantium ut voluptatem!
        Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến
        Hành Hoán Tất Hợp đồng Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
        labore cupiditate esse optio quam? Ab sit eos voluptate amet saepe est atque nemo, beatae
        iste assumenda dolorum fugiat, odit nam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Fuga molestiae nobis similique dignissimos, quasi consectetur. Ratione aut nisi ab,
        est excepturi illum repellat veritatis, tempora illo distinctio, accusantium ut voluptatem!
        Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến
        Hành Hoán Tất Hợp đồng Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
        labore cupiditate esse optio quam? Ab sit eos voluptate amet saepe est atque nemo, beatae
        iste assumenda dolorum fugiat, odit nam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Fuga molestiae nobis similique dignissimos, quasi consectetur. Ratione aut nisi ab,
        est excepturi illum repellat veritatis, tempora illo distinctio, accusantium ut voluptatem!
        Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến
        Hành Hoán Tất Hợp đồng Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
        labore cupiditate esse optio quam? Ab sit eos voluptate amet saepe est atque nemo, beatae
        iste assumenda dolorum fugiat, odit nam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Fuga molestiae nobis similique dignissimos, quasi consectetur. Ratione aut nisi ab,
        est excepturi illum repellat veritatis, tempora illo distinctio, accusantium ut voluptatem!
        Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến
        Hành Hoán Tất Hợp đồng Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique
        labore cupiditate esse optio quam? Ab sit eos voluptate amet saepe est atque nemo, beatae
        iste assumenda dolorum fugiat, odit nam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Fuga molestiae nobis similique dignissimos, quasi consectetur. Ratione aut nisi ab,
        est excepturi illum repellat veritatis, tempora illo distinctio, accusantium ut voluptatem!
        <FormProvider {...methods}>
          <RangePickerForm
            name='time'
            label='Time'
          />
          <Button
            onClick={methods.handleSubmit((value) => {
              submitContact(value);
            })}
          >
            Xác Nhận Hoàn Tất Hợp Đồng
          </Button>
        </FormProvider>
      </ModalAntd>
    </ModalAntd>
  );
}
