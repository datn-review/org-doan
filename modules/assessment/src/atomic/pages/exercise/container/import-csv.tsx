import { SelectGrade, SelectSubject, useMessageHook } from '@org/core';
import { useTranslation } from '@org/i18n';
import { useCreateExerciseCustomsMutation } from '@org/store';
import {
  BoxCenter,
  Button,
  CheckBoxForm,
  Col,
  Drawer,
  FormProvider,
  InputForm,
  Row,
  SIZE,
  TYPE_BUTTON,
  UploadFilesForm1,
  VARIANT,
  useForm,
  yupResolver,
} from '@org/ui';

import * as yup from 'yup';
const schema = yup.object({});
const dataInit: any = {
  name: '',
  status: 1,
  gradeLevel: undefined,
  subject: undefined,
};

export function ImportCSV({ close, refresh }: any) {
  const { messageError, messageSuccess, contextHolder } = useMessageHook();
  const { t } = useTranslation();
  const [createExerciseCustoms] = useCreateExerciseCustomsMutation();

  const methods = useForm<any>({
    defaultValues: {},

    resolver: yupResolver(schema),
  });
  const handleSave = (value: any) => {
    createExerciseCustoms(value)
      .then(() => {
        messageSuccess(t('saved.succes'));

        refresh();
      })
      .catch(() => {
        messageError(t('saved.error'));
        refresh();
      });
  };

  return (
    <div>
      {contextHolder}

      <Drawer
        title={t('exercise.import')}
        placement={'right'}
        width={'500px'}
        onClose={close}
        open={true}
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
                console.log(
                  '🚀 ~ file: import-csv.tsx:66 ~ onClick={methods.handleSubmit ~ value:',
                  value,
                );
                const formData = new FormData();
                Object.entries(value).forEach(([name, record]: [string, string | any]) => {
                  if (!record) return;

                  if (name === 'file') {
                    if (record?.[0]?.originFileObj) {
                      formData.append(name, record?.[0]?.originFileObj);
                    }
                    return;
                  }

                  formData.append(name, record);
                });

                handleSave(formData);
                // handleSave(value);
              })}
            >
              {t('button.save')}
            </Button>
          </BoxCenter>
        }
      >
        <FormProvider {...methods}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <InputForm
                name='name'
                label={t('name')}
              />
            </Col>
            <Col span={12}>
              <SelectGrade />
            </Col>
            <Col span={12}>
              <SelectSubject />
            </Col>
            <Col span={12}>
              <CheckBoxForm
                name={'isPublish'}
                labelCB={t('publish')}
              />
            </Col>
            <Col span={24}>
              <UploadFilesForm1
                name='file'
                label={t('file')}
              />
            </Col>
          </Row>

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
      </Drawer>
    </div>
  );
}
