import { useCRUDContext, useMessageHook } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useLazyFindAssignmentQuery,
  useSubmissionMutation,
  useUpdateAssignmentMutation,
} from '@org/store';
import {
  Button,
  CheckboxGroup,
  Radio,
  Section,
  Space,
  Spin,
  TextSection,
  useForm,
  yupResolver,
} from '@org/ui';
import { isArray, isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/css';

type Status = {
  id: string;
  title: string;
};
type IUpdate = {
  title: string;
  status?: number;
  gradeLevel?: number;
  subject?: number;
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
};

export function DoAssignment() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });
  const { assignmentId } = useParams();
  const [answer, setAnswer] = useState<Record<number, any>>({});
  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateAssignmentMutation();
  const [submission, { isLoading: isLoadingSubmission }] = useSubmissionMutation();

  const [getAssignment, { data: dataAssignment, isLoading: isLoadingAssignment }] =
    useLazyFindAssignmentQuery();

  const handleSubmit = () => {
    // assessment: id,
    //     question: answer.questionId,
    //     answer: answer.answer,
    const answers = Object.entries(answer)?.map(([key, value]: any) => ({
      questionId: key,
      answer: isArray(value) ? value?.join(',') : `${value}`,
    }));
    console.log(answers);
    submission({
      id: dataAssignment.id,
      body: { answers },
    })
      .then(() => {
        messageSuccess(t('assignment.submit.success'));
      })
      .catch(() => {
        messageError(t('assignment.submit.error'));
      });
  };

  useEffect(() => {
    getAssignment({ id: assignmentId });
  }, [assignmentId]);

  // useEffect(() => {
  //   if (idEdit) {
  //     getData({ id: idEdit })
  //       .unwrap()
  //       .then((data: any) => {
  //         setDataUpsert(data);
  //       });
  //   }
  // }, [idEdit]);
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
      // lesson: Number(lessonId),

      exercise: formData.exercise,
      startTime,
      endTime,
    };

    console.log(body);
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
    return current && current < dayjs().endOf('day');
  };

  return (
    <Section>
      {contextHolder}

      <Spin spinning={isLoadingAssignment}>
        <Space
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <TextSection left>
            {t('exercise.name')}: {dataAssignment?.exercise?.name}
          </TextSection>
          <Button onClick={handleSubmit}>{t('submit')}</Button>
        </Space>

        {dataAssignment?.exercise?.questions?.map((question: any, index: number) => {
          return (
            <Space
              className={css`
                font-size: 1.6rem;
                font-weight: 500;
                padding-bottom: 2rem;
                //padding-bottom: 0.5rem;
                .ant-checkbox-group,
                .ant-radio-group {
                  display: block;
                }
                .ant-checkbox-group-item,
                .ant-radio-wrapper {
                  display: flex;
                  padding: 0.5rem 1.4rem;
                }
              `}
            >
              <Space>
                {index + 1}. {question.content} ({question.score} {t('point')})
                <Space>
                  <Question
                    question={question}
                    value={answer?.[question.id] || undefined}
                    onChange={(value: any) => {
                      setAnswer((prev) => ({
                        ...prev,
                        [question.id]: value,
                      }));
                    }}
                  />
                </Space>
              </Space>
            </Space>
          );
        })}
      </Spin>
    </Section>
  );
}

export const Question = ({ question, onChange, value }: any) => {
  const options = useMemo(() => {
    return question.options?.map((option: any, index: number) => ({
      label: (
        <Space>
          {String.fromCharCode(index + 97)}. {option.content}{' '}
        </Space>
      ),
      value: option.id,
    }));
  }, [question]);
  if (question.type === 0)
    return (
      <Radio.Group
        options={options}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    );

  return (
    <CheckboxGroup
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
