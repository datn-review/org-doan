import { useMessageHook } from '@org/core';
import { useTranslation } from '@org/i18n';
import { useLazyFindExerciseQuery } from '@org/store';
import {
  BoxBetween,
  BoxCenter,
  Button,
  CheckCircleFilled,
  CheckboxGroup,
  CloseCircleFilled,
  H2,
  ModalAntd,
  Radio,
  Section,
  Space,
  Spin,
  TextSection,
} from '@org/ui';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

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

export function ViewExercise({ id, close }: any) {
  const { t } = useTranslation();

  const { messageError, messageSuccess, contextHolder } = useMessageHook();
  const [showAns, setShowAns] = useState(false);

  const [findExerciseQuery, { isLoading: isLoading, data }] = useLazyFindExerciseQuery();

  useEffect(() => {
    findExerciseQuery({ id });
  }, [id]);
  const componentRef = useRef<any>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });
  return (
    <ModalAntd
      title={''}
      onCancel={close}
      open={true}
      width={'90%'}
      footer={<></>}
    >
      <Section>
        <Spin spinning={isLoading}>
          <Space ref={componentRef}>
            <Space
              className={css`
                display: flex;
                justify-content: space-between;
                //align-items: center;
                margin-bottom: 10px;
              `}
            >
              <Space
                className={css`
                  font-size: 20px;
                  font-weight: 600;
                `}
              >
                {data?.name}
              </Space>
            </Space>

            {contextHolder}

            {data?.questions?.map((question: any, index: number) => {
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
                    {index + 1}. {question.content} ({question.score} {t('point')})
                    <Space>
                      <QuestionReview
                        question={question}
                        showAns={showAns}
                      />
                    </Space>
                  </Space>
                </Space>
              );
            })}
          </Space>
          <BoxBetween>
            <Space></Space>
            <BoxCenter
              className={css`
                gap: 4px;
              `}
            >
              <Button onClick={() => setShowAns((prev) => !prev)}>
                {showAns ? 'Ẩn Đáp Án' : 'Đáp Án'}
              </Button>
              {'   '}
              <Button onClick={handlePrint}>In Đề</Button>
            </BoxCenter>
          </BoxBetween>
        </Spin>
      </Section>
    </ModalAntd>
  );
}

export const QuestionReview = ({ question, showAns }: any) => {
  const isRadio = question.type === 0;
  const optionCorrects = question?.options?.filter((item: any) => item?.isCorrect);
  const value = isRadio
    ? `${optionCorrects?.[0]?.id}`
    : optionCorrects?.map((item: any) => `${item.id}`);
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

        if (!isRadio && value?.includes(String(option.id))) {
          cssRadio = css`
            color: red;
          `;
        }
      }
      if (!showAns) {
        cssRadio = '';
        cssSuccess = '';
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
  }, [question, showAns]);
  if (isRadio)
    return (
      <Radio.Group
        options={options}
        value={showAns ? value : undefined}
      />
    );

  return (
    <CheckboxGroup
      options={options}
      value={showAns ? value : undefined}
    />
  );
};
