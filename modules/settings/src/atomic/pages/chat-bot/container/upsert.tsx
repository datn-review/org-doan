import { css } from '@emotion/css';
import { useCRUDContext, useMessageHook } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useCreateChatBotMutation,
  useLazyFindChatBotQuery,
  useUpdateChatBotMutation,
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
  TextAreaForm,
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
  status?: number;
  intent: string;
  input?: string;

  output?: string;
  language?: string;
};

const schema = (idEdit: number) =>
  yup.object({
    intent: yup.string().required(i18next.t('required.name')),
    status: yup.number(),
  });
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  intent: '',
  input: '',

  output: '',

  status: 1,
  language: 'vi',
};

export function Upsert() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });

  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateChatBotMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindChatBotQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateChatBotMutation();

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
          messageSuccess(t('edit.success'));
        })
        .catch(() => {
          messageError(t('edit.error'));
        })
        .finally(() => {
          close();
          setIsFetch(true);
        });
    } else {
      createData(formData)
        .then(() => {
          messageSuccess(t('add.success'));
        })
        .catch((err) => {
          messageSuccess(t('add.error'));
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
              <TextAreaForm
                name='input'
                label={t('input')}
              />

              <TextAreaForm
                name='output'
                label={t('output')}
              />
              <InputForm
                name='intent'
                label={t('intent')}
              />

              <SelectForm
                name='language'
                label={t('language')}
                options={[
                  { value: 'vi', label: t('vietnamese') },
                  { value: 'en', label: t('english') },
                ]}
                defaultValue={'vi'}
                className={css`
                  min-width: 20rem;
                  min-height: 3.8rem;
                `}
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
