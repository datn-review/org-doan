import { css } from '@emotion/css';
import { useCRUDContext, useMessage } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useCreateGradeLevelMutation,
  useLazyFindGradeLevelQuery,
  useUpdateGradeLevelMutation,
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

import { StatusEnum, getImage, statusOptionUpsert } from '@org/utils';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import * as yup from 'yup';

type Status = {
  id: string;
  name: string;
};
type IUpdate = {
  nameEN: string;
  nameVI: string;
  descriptionVI?: string;
  descriptionEN?: string;
  status?: number;
};

const schema = (idEdit: number) =>
  yup.object({
    nameVI: yup.string().required(i18next.t('required.name')),
    nameEN: yup.string().required(i18next.t('required.name')),
    descriptionVI: yup.string(),
    descriptionEN: yup.string(),
    status: yup.number(),
  });
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  nameVI: '',
  nameEN: '',
  descriptionVI: '',
  descriptionEN: '',
  status: 1,
};

export function Upsert() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });

  const { messageError, messageSuccess, contextHolder } = useMessage();

  const [createData, { isLoading: isLoadingCreate }] = useCreateGradeLevelMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindGradeLevelQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateGradeLevelMutation();

  useEffect(() => {
    if (idEdit) {
      getData({ id: idEdit })
        .unwrap()
        .then((data: any) => {
          setDataUpsert(data);
        });
    }
  }, [idEdit]);
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
      {isUpsert && (
        <Drawer
          title={idEdit ? t('user.edit.title') : t('user.add.title')}
          placement={'right'}
          width={500}
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
                  handleSave(value);
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
                name='nameVI'
                label={t('nameVI')}
              />
              <InputForm
                name='descriptionVI'
                label={t('descriptionVI')}
              />
              <InputForm
                name='nameEN'
                label={t('nameEN')}
              />
              <InputForm
                name='descriptionEN'
                label={t('descriptionEN')}
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
            </FormProvider>
          </Spin>
        </Drawer>
      )}
    </>
  );
}
