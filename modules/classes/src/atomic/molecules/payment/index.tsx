import { css } from '@emotion/css';
import { useMessageHook, useModal } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useAppDispatch,
  useCreateCollaborationMutation,
  useCreatePaymentMutation,
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
import { Link, useNavigate } from 'react-router-dom';
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
  close: () => void;
  refetch: () => void;
}

export enum EnumTypeContact {
  PostSignature,
  RegisterSignature,
  View,
}

export function Payment({ data, close, refetch }: IProps) {
  const { t } = useTranslation();
  console.log(data);
  const navigate = useNavigate();

  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const [createPaymentVNPAY] = useCreatePaymentMutation();

  const [registerConfirmCollaboration] = useRegisterConfirmCollaborationMutation();

  const [posterConfirmCollaboration] = usePosterConfirmCollaborationMutation();
  const submitContact = (value: any) => {
    createPaymentVNPAY({
      id: data?.id,
    })
      .unwrap()
      .then((data: any) => {
        console.log(data);
        window.location.replace(data?.vnpUrl);
      });
  };
  return (
    <ModalAntd
      title={t('payment.contact.title')}
      open={!!data}
      onCancel={close}
      width={'90%'}
      className={css`
        top: 20px;
      `}
      footer={<></>}
    >
      <Space>
        <b>{t('payment.code')}</b>: PAY_FEE_{data?.id}
      </Space>
      <Space>
        <b>{t('payment.feeMonth')}</b>: {dayjs(data?.feeMonthDate).format('MM-YYYY')}
      </Space>
      <Space>
        <b> {t('payment.dead')}</b>: {dayjs(data?.deadPaymentDate).format('DD-MM-YYYY')}
      </Space>
      <Space>
        <b>{t('money')}</b>:{' '}
        {data?.amount?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
      </Space>
      <br />
      <Button onClick={submitContact}>{t('payment.title')}</Button>
    </ModalAntd>
  );
}
