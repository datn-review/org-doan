import { css } from '@emotion/css';
import { SelectGrade, SelectSubject, useCRUDContext, useMessageHook } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useCreateAssignmentMutation,
  useGetExerciseActiveQuery,
  useLazyFindAssignmentQuery,
  useLazyGetExerciseQuery,
  useUpdateAssignmentMutation,
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
  Section,
  TextSection,
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
  name: string;
  status?: number;
};

const schema = (idEdit: number) =>
  yup.object({
    name: yup.string().required(i18next.t('required.name')),
    status: yup.number(),
  });
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  name: '',
  status: 1,
};

export function CreateAssignment() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });

  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateAssignmentMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindAssignmentQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateAssignmentMutation();

  const [getExercise, { data: dataGetExercise, isLoading: isLoadingGetExercise }] =
    useLazyGetExerciseQuery();

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
    <Section>
      <TextSection>{t('assignment.create')}</TextSection>
      {contextHolder}

      <Spin spinning={isLoadingCreate || isLoadingGet || isLoadingUpdate}>
        <FormProvider {...methods}>
          <InputForm
            name='name'
            label={t('name')}
          />
          <SelectGrade />
          <SelectSubject />

          <SelectForm
            name='exercise'
            label={t('assignment.exercise')}
            options={statusOptionUpsert}
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
    </Section>
  );
}
