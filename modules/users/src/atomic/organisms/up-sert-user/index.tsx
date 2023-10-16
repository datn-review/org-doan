import { css } from '@emotion/css';
import { useCRUDContext } from '@org/core';
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
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
type IPhoto = {
  id: string;
  path: string;
};
type IUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: any[];
  status?: number;
};

const schema = yup.object({
  email: yup.string().required(i18next.t('required.email')),
  password: yup.string().required(i18next.t('required.password')),
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

    resolver: yupResolver(schema),
  });
  const { dataUpsert } = useCRUDContext();
  useEffect(() => {
    Object.entries(dataInit).forEach(([name, value]) => {
      const recordName = name as TypeName;

      const recordData = (dataUpsert as IUser)?.[name as TypeName];
      if (name === 'photo') {
        const photoArray = [
          {
            uid: (recordData as unknown as IPhoto)?.id || '',
            status: 'done',
            url: getImage((recordData as unknown as IPhoto)?.path),
          },
        ];
        methods.setValue(recordName, photoArray);
        return;
      }
      if (name == 'status') {
        return;
      }

      methods.setValue(recordName, recordData || '');
    });
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
              onSave(value);
              console.log(value);
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
            label={t('user.password')}
            $type={TypeInput.Password}
          />
          <SelectForm
            name='status'
            label={'Status'}
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
