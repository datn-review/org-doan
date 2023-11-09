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
  StudentSignature,
  TutorSignature,
  View,
}

export function Contants({ data, type, close, refetch }: IProps) {
  const { t } = useTranslation();

  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const [createCollaboration] = useCreateCollaborationMutation();
  const submitContact = (value: any) => {
    const startDate = dayjs(value?.time?.[0]);
    const endDate = dayjs(value?.time?.[1]);

    if (type === EnumTypeContact.StudentSignature) {
      createCollaboration({
        posts: data?.postsId,
        tutor: data?.user.id,
        studentSignature: 'studentSignature',
        startDate,
        endDate,
      }).then(() => {
        refetch();
      });
    } else {
      createCollaboration({
        posts: data.postsId,
        tutor: data?.user.id,
        tutorSignature: 'studentSignature',
      }).then(() => {
        refetch();
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
  );
}
