import { css } from '@emotion/css';
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
} from '@org/ui';

import { StatusEnum, statusOption } from '@org/utils';
import React, { useRef } from 'react';
import * as yup from 'yup';

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: [];
  status?: number;
}

const schema = yup.object({
  email: yup.string().required(i18next.t('required.email')),
  password: yup.string().required(i18next.t('required.password')),
  lastName: yup.string().required(i18next.t('required.lastName')),
  firstName: yup.string().required(i18next.t('required.firstName')),
});

export function UpsertUser({ onClose, onSave, open, idEdit }: any) {
  const formatRef = useRef<HTMLFormElement | null>(null);
  const { t } = useTranslation();
  const methods = useForm<IUser>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      photo: [],
      status: 1,
    },
    resolver: yupResolver(schema),
  });
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
          options={statusOption}
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
    </Drawer>
  );
}
