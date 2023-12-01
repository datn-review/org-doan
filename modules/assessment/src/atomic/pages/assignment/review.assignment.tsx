import { useCRUDContext, useMessageHook } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useLazyFindAssignmentQuery,
  useLazyReviewAssignmentQuery,
  useSubmissionMutation,
  useUpdateAssignmentMutation,
} from '@org/store';
import {
  Button,
  CheckCircleFilled,
  CheckboxGroup,
  CloseCircleFilled,
  H2,
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
import { css, cx } from '@emotion/css';

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

export function ReviewAssignment() {
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
    useLazyReviewAssignmentQuery();

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
      <Spin spinning={isLoadingAssignment}>
        <Space
          className={css`
            display: flex;
            justify-content: space-between;
            //align-items: center;
          `}
        >
          <TextSection left>
            {t('review.assignment')}: {dataAssignment?.exercise?.name}
          </TextSection>
          <h3
            className={css`
              padding-top: 2rem;
            `}
          >
            {t('point')} : {dataAssignment?.score}
          </h3>
        </Space>

        {contextHolder}

        {dataAssignment?.exercise?.questions?.map((question: any, index: number) => {
          return (
            <Space>
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
                    padding: 0.5rem 2rem;
                  }
                `}
              >
                {question.isCorrect ? (
                  <CheckCircleFilled
                    className={css`
                      color: #52c41a;
                    `}
                  />
                ) : (
                  <CloseCircleFilled
                    className={css`
                      color: red;
                    `}
                  />
                )}{' '}
                {'   '}
                {index + 1}. {question.content} ({question.score} {t('point')})
                <Space>
                  <Question question={question} />
                </Space>
              </Space>
            </Space>
          );
        })}
      </Spin>
    </Section>
  );
}

export const Question = ({ question }: any) => {
  const isRadio = question.type === 0;
  const value = isRadio ? question.answer : question.answer?.split(',');
  const options = useMemo(() => {
    return question.options?.map((option: any, index: number) => {
      let cssSuccess = '';
      let cssRadio = '';
      if (option.isCorrect) {
        cssSuccess = css`
          color: #52c41a !important;
          font-weight: bold;
        `;
      } else {
        if (isRadio && Number(value) === option.id) {
          cssRadio = css`
            color: red;
          `;
        }

        if (!isRadio && value.includes(String(option.id))) {
          cssRadio = css`
            color: red;
          `;
        }
      }

      return {
        label: (
          <Space className={cx(cssRadio, cssSuccess)}>
            {String.fromCharCode(index + 97)}. {option.content}
          </Space>
        ),
        value: `${option.id}`,
      };
    });
  }, [question]);
  if (isRadio)
    return (
      <Radio.Group
        options={options}
        // onChange={()}
        value={value}
        // disabled={true}
      />
    );

  return (
    <CheckboxGroup
      options={options}
      value={value}
      // onChange={onChange}
      // disabled={true}
    />
  );
};
