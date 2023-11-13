import { css } from '@emotion/css';
import { useCRUDContext, useMessageHook } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  BoxCenter,
  Button,
  CheckBoxForm,
  Drawer,
  FormProvider,
  InputForm,
  SIZE,
  Select,
  SelectForm,
  Space,
  TYPE_BUTTON,
  TypeInput,
  VARIANT,
  useForm,
  yupResolver,
  UploadImage,
  UnloadImageForm,
  Spin,
} from '@org/ui';

import { StatusEnum, getImage, statusOption, statusOptionUpsert } from '@org/utils';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
type IPhoto = {
  id: string;
  path: string;
};
type Status = {
  id: string;
  name: string;
};
type IUser = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  photo?: any[];
  status?: number;
};

const schema = (idEdit: number) =>
  yup.object({
    email: yup.string().required(i18next.t('required.email')),
    password: idEdit ? yup.string() : yup.string().required(i18next.t('required.password')),
    lastName: yup.string().required(i18next.t('required.lastName')),
    firstName: yup.string().required(i18next.t('required.firstName')),
  });
type TypeName = keyof IUser;
const dataInit: IUser = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  photo: [],
  status: 1,
};

export function UpsertUser({ onClose, onSave, open, idEdit, idLoading }: any) {
  const { t } = useTranslation();
  const methods = useForm<IUser>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });
  const { dataUpsert, setIsFetch, close } = useCRUDContext();
  useEffect(() => {
    if (!isEmpty(dataUpsert)) {
      Object.entries(dataInit).forEach(([name, value]) => {
        const recordName = name as TypeName;

        const recordData = (dataUpsert as IUser)?.[name as TypeName];
        if (name === 'photo') {
          const photoArray = recordData
            ? [
                {
                  uid: (recordData as unknown as IPhoto)?.id || '',
                  status: 'done',
                  url: getImage((recordData as unknown as IPhoto)?.path),
                },
              ]
            : [];
          methods.setValue(recordName, photoArray);
          return;
        }
        if (name == 'status') {
          methods.setValue(recordName, (recordData as unknown as Status)?.id);
          return;
        }

        methods.setValue(recordName, recordData || '');
      });
    }

    // methods.setValue('email', formatRef);
  }, [JSON.stringify(dataUpsert)]);

  return (
    <Drawer
      title={idEdit ? t('user.edit.title') : t('user.add.title')}
      placement={'right'}
      width={500}
      onClose={onClose}
      open={open}
      extra={
        <BoxCenter>
          <Button
            onClick={onClose}
            $type={TYPE_BUTTON.Primary}
            $variant={VARIANT.Outlined}
            $size={SIZE.ExtraSmall}
          >
            {t('button.cancel')}
          </Button>
          <Button
            $type={TYPE_BUTTON.Primary}
            $size={SIZE.ExtraSmall}
            onClick={methods.handleSubmit((value) => {
              const formData = new FormData();
              Object.entries(value).forEach(([name, record]: [string, string | any]) => {
                if (!record) return;

                if (name === 'photo') {
                  if (record?.[0]?.originFileObj) {
                    formData.append(name, record?.[0]?.originFileObj);
                  }
                  return;
                }

                formData.append(name, record);
              });

              onSave(formData);
            })}
          >
            {t('button.save')}
          </Button>
        </BoxCenter>
      }
    >
      <Spin spinning={idLoading}>
        <FormProvider {...methods}>
          <InputForm
            name='firstName'
            label={t('user.firstName')}
          />
          <InputForm
            name='lastName'
            label={t('user.lastName')}
          />
          <InputForm
            name='email'
            label={t('user.email')}
          />
          <InputForm
            name='password'
            label={idEdit ? t('user.new_password') : t('user.password')}
            $type={TypeInput.Password}
          />
          <SelectForm
            name='status'
            label={t('user.status')}
            options={statusOptionUpsert}
            defaultValue={StatusEnum.active}
            className={css`
              min-width: 20rem;
              min-height: 3.8rem;
            `}
          />
          <UnloadImageForm
            maxLength={1}
            name='photo'
            label={t('user.photo')}
          />
        </FormProvider>
      </Spin>
    </Drawer>
  );
}
