import { SelectGrade, SelectSubject, useMessageHook } from '@org/core';
import { useTranslation } from '@org/i18n';
import { useCreateExerciseCrawlMutation } from '@org/store';
import {
  BoxCenter,
  Button,
  Col,
  Drawer,
  FormProvider,
  InputForm,
  Row,
  SIZE,
  TYPE_BUTTON,
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

export function Crawl({ close }: any) {
  const { messageError, messageSuccess, contextHolder } = useMessageHook();
  const { t } = useTranslation();
  const [createExerciseCrawl] = useCreateExerciseCrawlMutation();

  const methods = useForm<any>({
    defaultValues: {},

    resolver: yupResolver(schema),
  });
  const handleSave = (value: any) => {
    createExerciseCrawl(value)
      .then(() => {
        messageSuccess(t('saved.succes'));
      })
      .catch(() => {
        messageError(t('saved.error'));
      });
  };

  return (
    <div>
      {contextHolder}

      <Drawer
        title={t('exercise.crawl')}
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
                handleSave(value);
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
                name='link'
                label={t('Link Crawl')}
              />
            </Col>
          </Row>
        </FormProvider>
      </Drawer>
    </div>
  );
}
