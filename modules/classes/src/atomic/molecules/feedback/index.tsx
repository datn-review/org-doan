import { css } from '@emotion/css';
import { useCRUDContext, useMessageHook } from '@org/core';
import { Editor } from '@org/editor';
import { i18next, useTranslation } from '@org/i18n';
import {
  useCreateFeedbackMutation,
  useCreateSubjectMutation,
  useLazyFindSubjectQuery,
  useUpdateSubjectMutation,
} from '@org/store';
import {
  BoxCenter,
  Button,
  Drawer,
  FormProvider,
  InputForm,
  RateForm,
  SIZE,
  SelectForm,
  Space,
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
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';

type Status = {
  id: string;
  name: string;
};
type IUpdate = {
  overallRating: number;
  interactionRating?: number;
  qualityRatting?: number;
  contentRatting?: number;
  presentationRating?: number;
};

const schema = yup.object({
  overallRating: yup.number().required(i18next.t('required.name')),
  //   nameEN: yup.string().required(i18next.t('required.name')),
  //   descriptionVI: yup.string(),
  //   descriptionEN: yup.string(),
  //   status: yup.number(),
});
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  overallRating: 3,
  interactionRating: 3,
  qualityRatting: 3,
  contentRatting: 3,
  presentationRating: 3,
};

export function Feedback({ data }: any) {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,
    resolver: yupResolver(schema),
  });
  const feeback = useMemo(() => {
    return data?.feedback?.[0] || null;
  }, [data]);
  useEffect(() => {
    if (!isEmpty(feeback)) {
      Object.entries(dataInit).forEach(([name, value]) => {
        const recordName = name as TypeName;

        const recordData = (feeback as IUpdate)?.[name as TypeName];
        console.log('🚀 ~ file: index.tsx:79 ~ Object.entries ~ data:', data);

        methods.setValue(recordName, recordData || 0);
      });
    }
  }, [JSON.stringify(feeback)]);
  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateFeedbackMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindSubjectQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateSubjectMutation();

  //   useEffect(() => {
  //     // if (data) {
  //     getData({ id: idEdit })
  //       .unwrap()
  //       .then((data: any) => {
  //         setDataUpsert(data);
  //       });
  //     // }
  //   }, [idEdit]);
  const handleSave = async (formData: any) => {
    createData({ ...formData, comment, collaboration: data?.id })
      .then(() => {
        messageSuccess(t('user.add.success'));
      })
      .catch((err) => {
        messageSuccess(t('user.add.error'));
      })
      .finally(() => {
        //   close();
      });
  };
  //   };
  //   useEffect(() => {
  //     if (!isEmpty(dataUpsert)) {
  //       Object.entries(dataInit).forEach(([name, value]) => {
  //         const recordName = name as TypeName;

  //         const recordData = (dataUpsert as IUpdate)?.[name as TypeName];

  //         if (name == 'status') {
  //           methods.setValue(recordName, (recordData as unknown as Status)?.id);
  //           return;
  //         }

  //         methods.setValue(recordName, recordData || '');
  //       });
  //     }
  //   }, [JSON.stringify(dataUpsert)]);

  return (
    <>
      {contextHolder}

      <Spin spinning={isLoadingCreate}>
        <FormProvider {...methods}>
          <Space
            className={css`
              text-align: center;
            `}
          >
            <RateForm
              name={'interactionRating'}
              label={t('interactionRating')}
              disabled={!!feeback}
            />
            <RateForm
              name={'qualityRatting'}
              label={t('qualityRatting')}
              disabled={!!feeback}
            />
            <RateForm
              name={'contentRatting'}
              label={t('contentRatting')}
              disabled={!!feeback}
            />
            <RateForm
              name={'presentationRating'}
              label={t('presentationRating')}
              disabled={!!feeback}
            />

            <RateForm
              name={'overallRating'}
              label={t('overallRating')}
              disabled={!!feeback}
            />
            <Space>{t('comment')}</Space>
          </Space>
          <Editor
            onChange={(value) => setComment(value)}
            defaultValue={feeback?.comment || ''}
            isShow={feeback?.comment}
          />
          <br />
          {!feeback && (
            <Button
              $type={TYPE_BUTTON.Primary}
              // $size={SIZE.ExtraSmall}
              onClick={methods.handleSubmit((value) => {
                handleSave(value);
              })}
            >
              {t('button.send')}
            </Button>
          )}
        </FormProvider>
      </Spin>
    </>
  );
}
