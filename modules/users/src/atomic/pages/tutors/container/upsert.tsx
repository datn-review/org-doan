import { css } from '@emotion/css';
import { useCRUDContext, useMessage, useUnmount } from '@org/core';
import { getNameLanguage, i18next, useTranslation } from '@org/i18n';
import {
  useCreateUserTutorMutation,
  useGetCertificationActiveQuery,
  useLazyFindUserTutorQuery,
  useUpdateUserTutorMutation,
} from '@org/store';
import {
  BoxCenter,
  Button,
  Drawer,
  FormProvider,
  InputForm,
  SIZE,
  SelectForm,
  Spin,
  TYPE_BUTTON,
  TypeInput,
  UnloadImageForm,
  VARIANT,
  useForm,
  yupResolver,
} from '@org/ui';

import { StatusEnum, formatData, getImage, statusOptionUpsert } from '@org/utils';
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from 'react';
import * as yup from 'yup';

type Status = {
  id: string;
  name: string;
};
type IUpdate = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  photo?: any[];
  status?: number;
  certification?: number[];
};

const schema = (idEdit: number) =>
  yup.object({
    email: yup.string().required(i18next.t('required.email')),
    password: idEdit ? yup.string() : yup.string().required(i18next.t('required.password')),
    lastName: yup.string().required(i18next.t('required.lastName')),
    firstName: yup.string().required(i18next.t('required.firstName')),
  });
type TypeName = keyof IUpdate;
type IPhoto = {
  id: string;
  path: string;
};
const dataInit: IUpdate = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  photo: [],
  status: 1,
  certification: [],
};

export function Upsert() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });

  const { messageError, messageSuccess, contextHolder } = useMessage();

  const [createData, { isLoading: isLoadingCreate }] = useCreateUserTutorMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindUserTutorQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserTutorMutation();
  const { data: dataCertification } = useGetCertificationActiveQuery({});

  const name = getNameLanguage('nameVI', 'nameEN');
  const certification = useMemo(() => {
    return formatData({ data: dataCertification, name });
  }, [name, dataCertification]);

  console.log('🚀 ~ file: upsert.tsx:93 ~ useEffect ~ idEdit:', idEdit);
  useEffect(() => {
    if (idEdit) {
      getData({ id: idEdit })
        .unwrap()
        .then((data: any) => {
          setDataUpsert(data);
        });
    }
  }, [idEdit]);
  useUnmount(() => {
    setDataUpsert({});
  });
  const handleSave = async (formData: any) => {
    if (idEdit) {
      updateUser({ body: formData, id: idEdit })
        .then(() => {
          messageSuccess(t('user.edit.success'));
        })
        .catch(() => {
          messageError(t('user.edit.error'));
        })
        .finally(() => {
          close();
          setIsFetch(true);
        });
    } else {
      createData(formData)
        .then(() => {
          messageSuccess(t('user.add.success'));
        })
        .catch((err) => {
          messageSuccess(t('user.add.error'));
        })
        .finally(() => {
          close();
          setIsFetch(true);
        });
    }
  };
  useEffect(() => {
    if (!isEmpty(dataUpsert)) {
      Object.entries(dataInit).forEach(([name, value]) => {
        const recordName = name as TypeName;

        const recordData = (dataUpsert as IUpdate)?.[name as TypeName];
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
  }, [JSON.stringify(dataUpsert)]);

  return (
    <>
      {contextHolder}

      <Drawer
        title={idEdit ? t('user.edit.title') : t('user.add.title')}
        placement={'right'}
        width={'100%'}
        onClose={close}
        open={isUpsert}
        extra={
          <BoxCenter>
            <Button
              onClick={close}
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
                console.log(
                  '🚀 ~ file: upsert.tsx:180 ~ onClick={methods.handleSubmit ~ value:',
                  value,
                );
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
                  console.log('🚀 ~ file: upsert.tsx:193 ~ Object.entries ~ name:', name, record);
                });

                handleSave(formData);
              })}
            >
              {t('button.save')}
            </Button>
          </BoxCenter>
        }
      >
        <Spin spinning={isLoadingCreate || isLoadingGet || isLoadingUpdate}>
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
              size='large'
              mode='multiple'
              name='certification'
              label={t('Certification')}
              placeholder='Please Select Certification'
              options={certification}
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
    </>
  );
}
