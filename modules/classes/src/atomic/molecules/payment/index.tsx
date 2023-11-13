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
        window.open(data?.vnpUrl);
      });
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
      <Space>Tien: {data?.amount}</Space>
      <Button onClick={submitContact}>Thanh Toan</Button>
    </ModalAntd>
  );
}
