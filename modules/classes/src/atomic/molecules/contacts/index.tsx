import { css } from '@emotion/css';
import { useMessageHook, useModal } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useAppDispatch,
  useCreateCollaborationMutation,
  usePosterConfirmCollaborationMutation,
  useRegisterConfirmCollaborationMutation,
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

interface IProps {
  data: any;
  type: EnumTypeContact;
  close: () => void;
  refetch: () => void;
}

export enum EnumTypeContact {
  PostSignature,
  RegisterSignature,
  View,
}

export function Contants({ data, type, close, refetch }: IProps) {
  const { t } = useTranslation();

  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const [createCollaboration] = useCreateCollaborationMutation();

  const [registerConfirmCollaboration] = useRegisterConfirmCollaborationMutation();

  const [posterConfirmCollaboration] = usePosterConfirmCollaborationMutation();
  const submitContact = (value: any) => {
    const contractStartDate = dayjs(value?.time?.[0]);
    const contractEndDate = dayjs(value?.time?.[1]);
    if (type === EnumTypeContact.PostSignature) {
      posterConfirmCollaboration({
        id: data?.id,
        signature: 'studentSignature',
        contractTerms: 'Dieu Khoan Hop Dòng',
        contractStartDate,
        contractEndDate,
      }).then(() => {
        refetch();
        close();
      });
    }

    if (type === EnumTypeContact.RegisterSignature) {
      registerConfirmCollaboration({
        id: data?.id,
        signature: 'tutorSignature',
      }).then(() => {
        refetch();
        close();
      });
    }
  };
  return (
    <ModalAntd
      title=' Tiến Hành Hoán Tất Hợp đồng '
      open={!!data}
      onCancel={close}
      width={'90%'}
      className={css`
        top: 20px;
      `}
      footer={<></>}
    >
      Tiến Hành Hoán Tất Hợp đ Hoán Tất Hợp đồng Lorem ipsum, dolor sit amet consectetur adipisicing
      elit. Similique labore cupiditate esse optio quam? Ab sit eos voluptate amet saepe est atque
      nemo, beatae iste assumenda dolorum fugiat, odit nam! Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Fuga molestiae nobis similique dignissimos, quasi consectetur. Ratione aut
      nisi ab, est excepturi illum repellat veritatis, tempora illo distinctio, accusantium ut
      voluptatem! Tiến Hành Hoán Tất Hợp đồng Tiến Hành! Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán
      Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Tiến Hành Hoán Tất Hợp đồng Lorem ipsum, dolor sit
      amet consectetur adipisicing elit. Similique labore cupiditate esse optio quam? Ab sit eos
      voluptate amet saepe est atque nemo, beatae iste cupiditate esse optio quam? Ab sit eos
      voluptate amet saepe est atque nemo, beatae iste assumenda dolorum fugiat, odit nam! Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae nobis similique dignissimos,
      quasi consectetur. Ratione aut nisi ab, est excepturi illum repellat veritatis, tempora illo
      distinctio, accusantium ut voluptatem!
      <FormProvider {...methods}>
        {type === EnumTypeContact.RegisterSignature && (
          <Space>
            <Space>StartDate: {dayjs(data?.contractStartDate).format('DD-MM-YYYY')}</Space>
            <Space>EndDate: {dayjs(data?.contractEndDate).format('DD-MM-YYYY')}</Space>

            <Space>Dieu Khoan: {data?.contractTerms}</Space>
          </Space>
        )}
        {type === EnumTypeContact.PostSignature && (
          <RangePickerForm
            name='time'
            label='Time'
          />
        )}

        <Button
          onClick={methods.handleSubmit((value) => {
            submitContact(value);
          })}
        >
          Xác Nhận Hoàn Tất Hợp Đồng
        </Button>
      </FormProvider>
    </ModalAntd>
  );
}
