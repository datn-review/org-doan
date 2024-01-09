import { css } from '@emotion/css';
import {
  SelectGrade,
  SelectGradeSubject,
  SelectSkill,
  SelectSubject,
  useCRUDContext,
  useMessageHook,
  useUnmount,
} from '@org/core';
import { i18next, Translation, useTranslation } from '@org/i18n';
import {
  useCreateQuestionMutation,
  useLazyFindQuestionQuery,
  useUpdateQuestionMutation,
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
  TextArea,
  TextAreaForm,
  Space,
  Input,
  CheckBox,
} from '@org/ui';

import { StatusEnum, getImage, statusOptionUpsert } from '@org/utils';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

enum TypeQuestionEnum {
  CheckBox = 1,
  Radio = 0,
}

enum LevelEnum {
  Low = 1,
  Medium = 2,
  Pro = 3,
}

const typeQuestions = [
  {
    value: TypeQuestionEnum.CheckBox,
    label: <Translation>{(t) => t('assessment.type.checkbox')}</Translation>,
  },
  {
    value: TypeQuestionEnum.Radio,
    label: <Translation>{(t) => t('assessment.type.radio')}</Translation>,
  },
];
export const levelQuestions = [
  {
    value: LevelEnum.Low,
    label: <Translation>{(t) => t('assessment.type.low')}</Translation>,
  },
  {
    value: LevelEnum.Medium,
    label: <Translation>{(t) => t('assessment.type.medium')}</Translation>,
  },
  {
    value: LevelEnum.Pro,
    label: <Translation>{(t) => t('assessment.type.pro')}</Translation>,
  },
];
export const levelQuestionsObject = levelQuestions?.reduce((acc: any, question: any) => {
  return { ...acc, [question?.value]: question.label };
}, {});

type Status = {
  id: string;
  name: string;
};
type IUpdate = {
  content: string;
  status?: number;
  type?: TypeQuestionEnum;
  level?: LevelEnum;
  score?: number;
  gradeLevel?: number | undefined;
  subject?: number | undefined;
};

const schema = (idEdit: number) =>
  yup.object({
    content: yup.string().required(i18next.t('required.name')),
    status: yup.number(),
  });
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  content: '',
  status: 1,
  type: TypeQuestionEnum.Radio,
  level: LevelEnum.Low,
  gradeLevel: undefined,
  subject: undefined,
  score: 0.25,
};
type OptionRecord = Record<number, any>;

export function Upsert() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();

  const [options, setOptions] = useState<OptionRecord>({
    [uuidv4()]: { content: '', isCorrect: false },
  });

  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,
    resolver: yupResolver(schema(idEdit)),
  });

  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateQuestionMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindQuestionQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateQuestionMutation();
  useUnmount(() => {
    setDataUpsert({});
  });
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
    console.log(formData);
    const option = idEdit
      ? Object.entries(options).map(([id, value]) => ({ id: Number(id), ...value }))
      : Object.entries(options).map(([_, value]) => value);
    const body = { ...formData, options: option };
    if (idEdit) {
      updateUser({ body: body, id: idEdit })
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
      createData(body)
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

        const recordData = (dataUpsert as IUpdate)?.[name as TypeName] as unknown as any;
        if (name == 'gradeLevel') {
          methods.setValue(recordName, recordData?.id);
          return;
        }
        if (name == 'subject') {
          methods.setValue(recordName, recordData?.id);
          return;
        }

        if (name == 'status') {
          methods.setValue(recordName, (recordData as unknown as Status)?.id);
          return;
        }

        methods.setValue(recordName, recordData ?? '');
      });

      const optionsData = dataUpsert?.options.reduce(
        (a: any, v: any) => ({ ...a, [v?.id]: { content: v?.content, isCorrect: v.isCorrect } }),
        {},
      );
      setOptions({ ...optionsData });
    }
  }, [JSON.stringify(dataUpsert)]);

  return (
    <>
      {contextHolder}
      {isUpsert && (
        <Drawer
          title={idEdit ? t('edit.title') : t('add.title')}
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
                name='content'
                label={t('question')}
              />
              <SelectGrade />
              <SelectSubject />
              {Object.entries(options).map(([key, item]: any, index) => (
                <Space
                  className={css`
                    display: flex;
                    gap: 1rem;
                  `}
                >
                  <Input
                    name='content'
                    label={t('question.content')}
                    value={item.content}
                    onChange={(value) =>
                      setOptions((prevState) => ({
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          content: value,
                        },
                      }))
                    }
                  />
                  <CheckBox
                    name={`is-correct-${key}`}
                    value={item.isCorrect}
                    onChange={(e: any) => {
                      console.log(e);
                      return setOptions((prevState) => ({
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          isCorrect: e.target.checked,
                        },
                      }));
                    }}
                    className={css`
                      .ant-checkbox-input {
                        left: 0 !important;
                      }
                    `}
                  />
                  <Button
                    onClick={() =>
                      setOptions((prev) => {
                        delete prev[key];
                        return { ...prev };
                      })
                    }
                  >
                    {t('remove')}
                  </Button>
                </Space>
              ))}

              <Space
                className={css`
                  display: flex;
                  justify-content: flex-end;
                `}
              >
                <Button
                  onClick={() =>
                    setOptions((prevState) => ({
                      ...prevState,
                      [uuidv4()]: {
                        content: '',
                        isCorrect: false,
                      },
                    }))
                  }
                >
                  {t('add')}
                </Button>
              </Space>

              <InputForm
                name='score'
                label={t('assessment.score')}
                className={css`
                  min-width: 20rem;
                  min-height: 3.8rem;
                `}
              />

              <SelectForm
                name='type'
                label={t('assessment.type')}
                options={typeQuestions}
                className={css`
                  min-width: 20rem;
                  min-height: 3.8rem;
                `}
              />

              <SelectForm
                name='level'
                label={t('assessment.level')}
                options={levelQuestions}
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
