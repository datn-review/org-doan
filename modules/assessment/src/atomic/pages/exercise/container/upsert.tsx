import { css } from '@emotion/css';
import { SelectGrade, SelectSubject, useCRUDContext, useMessageHook } from '@org/core';
import { i18next, useTranslation } from '@org/i18n';
import {
  useCreateExerciseMutation,
  useLazyFindExerciseQuery,
  useLazyGetQuestionQuery,
  useUpdateExerciseMutation,
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
  TextAreaForm,
  Row,
  Col,
  TableAntd,
  Space,
  Popover,
  Radio,
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
  name: string;
  status?: number;
  gradeLevel?: number;
  subject?: number;
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
  gradeLevel: undefined,
  subject: undefined,
};

export function Upsert() {
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert, dataUpsert } = useCRUDContext();
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema(idEdit)),
  });

  const { messageError, messageSuccess, contextHolder } = useMessageHook();

  const [createData, { isLoading: isLoadingCreate }] = useCreateExerciseMutation();

  const [getData, { isLoading: isLoadingGet }] = useLazyFindExerciseQuery();
  const [getQuestion, { isLoading: isLoadingQuestion, data: dataQuestions }] =
    useLazyGetQuestionQuery();

  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateExerciseMutation();

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
    const body = { ...formData, questions: selectedRowKeys };
    if (idEdit) {
      updateUser({ body, id: idEdit })
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

        const recordData = (dataUpsert as IUpdate)?.[name as TypeName];

        if (name == 'status') {
          methods.setValue(recordName, (recordData as unknown as Status)?.id);
          return;
        }

        methods.setValue(recordName, recordData || '');
      });
    }
  }, [JSON.stringify(dataUpsert)]);

  const gradeLevel = methods?.watch('gradeLevel');
  const subject = methods?.watch('subject');
  console.log('gradeLevel', gradeLevel);
  console.log('subject', subject);
  useEffect(() => {
    if (subject && gradeLevel)
      getQuestion({
        subject,
        gradeLevel,
      });
  }, [gradeLevel, subject]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dataQuestion = useMemo(() => {
    return dataQuestions?.data.map((question: any) => ({ ...question, key: question.id })) || [];
  }, [dataQuestions]);

  const columns: any = [
    {
      title: 'Question',
      dataIndex: 'content',
    },
    {
      title: 'Options',
      dataIndex: 'age',
      align: 'center',
      render: (_: any, record: any) => (
        <Popover
          content={
            <Space>
              {/*{record?.type ===1 ?*/}

              {/*    <Radio.Group name="radiogroup" defaultValue={1}>*/}
              {/*      <Radio value={1}>A</Radio>*/}
              {/*      <Radio value={2}>B</Radio>*/}
              {/*      <Radio value={3}>C</Radio>*/}
              {/*      <Radio value={4}>D</Radio>*/}
              {/*    </Radio.Group> :*/}
              {/*}*/}
              {record?.options?.map((option: any) => (
                <Space>
                  {t('question.option')}
                  {'.  '}
                  {option.content}
                </Space>
              ))}
            </Space>
          }
        >
          <Space>Details</Space>
        </Popover>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      {isUpsert && (
        <Drawer
          title={idEdit ? t('exercise.edit') : t('exercise.create')}
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
                name='name'
                label={t('exercise.title')}
              />
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <SelectGrade />
                </Col>
                <Col span={12}>
                  <SelectSubject />
                </Col>
              </Row>

              <TableAntd
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataQuestion || []}
              />

              {/*<SelectForm*/}
              {/*  name='status'*/}
              {/*  label={t('user.status')}*/}
              {/*  options={statusOptionUpsert}*/}
              {/*  defaultValue={StatusEnum.active}*/}
              {/*  className={css`*/}
              {/*    min-width: 20rem;*/}
              {/*    min-height: 3.8rem;*/}
              {/*  `}*/}
              {/*/>*/}
            </FormProvider>
          </Spin>
        </Drawer>
      )}
    </>
  );
}
