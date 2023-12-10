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
  Space,
  DatePickerForm,
  RangePickerForm,
} from '@org/ui';

import { StatusEnum, getImage, statusOptionUpsert, COLOR } from '@org/utils';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { ViewExercise } from '../exercise/container/view';

type Status = {
  id: string;
  title: string;
};
type IUpdate = {
  title: string;
  status?: number;
  gradeLevel?: number;
  subject?: number;
  exercise?: number;
};

const schema = (idEdit: number) =>
  yup.object({
    title: yup.string().required(i18next.t('required.name')),
    status: yup.number(),
  });
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  title: '',
  status: 1,
  gradeLevel: undefined,
  subject: undefined,
  exercise: undefined,
};

export function CreateAssignment() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const [exerciseId, setExerciseId] = useState<any>(null);
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });
  const { lessonId } = useParams();

  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateAssignmentMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindAssignmentQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateAssignmentMutation();

  const [getExercise, { data: dataGetExercise, isLoading: isLoadingGetExercise }] =
    useLazyGetExerciseQuery();

  const gradeLevel = methods?.watch('gradeLevel');
  const subject = methods?.watch('subject');
  const exerciseIdDetails = methods?.watch('exercise');

  const exerciseData = useMemo(() => {
    return (
      dataGetExercise?.data?.map((item: any) => ({
        label: (
          <Space
            className={css`
              display: flex;
              align-items: center;
              gap: 2rem;
            `}
          >
            {item.name}
          </Space>
        ),
        value: item.id,
      })) || []
    );
  }, [dataGetExercise]);

  useEffect(() => {
    if (subject && gradeLevel)
      getExercise({
        subject,
        gradeLevel,
      });
  }, [gradeLevel, subject]);

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
    // if (idEdit) {
    //   updateUser({ body: formData, id: idEdit })
    //     .then(() => {
    //       messageSuccess(t('user.edit.success'));
    //     })
    //     .catch(() => {
    //       messageError(t('user.edit.error'));
    //     })
    //     .finally(() => {
    //       close();
    //       setIsFetch(true);
    //     });
    // } else {
    const startTime = dayjs(formData.time[0]).format('YYYY-MM-DD HH:mm');
    const endTime = dayjs(formData.time[1]).format('YYYY-MM-DD HH:mm');

    const body = {
      title: formData.title,
      lesson: Number(lessonId),

      exercise: formData.exercise,
      startTime,
      endTime,
    };

    console.log(body);

    createData(body)
      .then(() => {
        messageSuccess(t('create.assignment.success'));
      })
      .catch((err) => {
        messageSuccess(t('create.assignment.erroe'));
      })
      .finally(() => {
        close();
        setIsFetch(true);
      });
    // }
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
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('millisecond');
  };

  return (
    <Section>
      <TextSection>{t('assignment.create')}</TextSection>
      {contextHolder}

      <Spin spinning={isLoadingCreate || isLoadingGet || isLoadingUpdate}>
        <FormProvider {...methods}>
          <InputForm
            name='title'
            label={t('name')}
          />
          <SelectGrade />
          <SelectSubject />
          <Space
            className={css`
              display: flex;
              align-items: center;
              gap: 2rem;
            `}
          >
            <SelectForm
              name='exercise'
              label={t('assignment.exercise')}
              options={exerciseData}
              className={css`
                min-width: 50rem;
                min-height: 3.8rem;
              `}
              showSearch
            />
            {exerciseIdDetails && (
              <Button onClick={() => setExerciseId(Number(exerciseIdDetails))}>
                {t('details')}
              </Button>
            )}
          </Space>

          <RangePickerForm
            name='time'
            label={t('assignment.time.startEnd')}
            disabledDate={disabledDate}
            format='YYYY-MM-DD HH:mm'
            showTime
            className={css``}
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
          <Button
            $type={TYPE_BUTTON.Primary}
            $size={SIZE.ExtraSmall}
            onClick={methods.handleSubmit((value) => {
              handleSave(value);
            })}
          >
            {t('assignment.create')}
          </Button>
          {exerciseId && (
            <ViewExercise
              id={exerciseId}
              close={() => setExerciseId(null)}
            />
          )}
        </FormProvider>
      </Spin>
    </Section>
  );
}
