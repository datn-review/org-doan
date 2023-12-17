import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  Button,
  Col,
  FormProvider,
  Row,
  Space,
  UnloadImageForm,
  UploadImage,
  WechatFilled,
  useForm,
} from '@org/ui';
import { COLOR, getImage } from '@org/utils';
import React, { useEffect } from 'react';

function InfoHeader({ data }: any) {
  const { t } = useTranslation();
  const methods = useForm<any>({
    defaultValues: { photo: [] },
  });
  useEffect(() => {
    if (data?.photo) {
      const photoArray = [
        {
          uid: data?.photo?.id || '',
          status: 'done',
          url: getImage(data?.photo?.path),
        },
      ];

      methods.setValue('photo', photoArray);
    }
  });

  return (
    <FormProvider {...methods}>
      <Space>
        <Space>
          <img
            src='https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-5/assets/user-profile-header-bg-ff6c2352.png'
            width={'100%'}
          />
        </Space>
        <Row
          className={css`
            padding: 2.4rem;
            background-color: ${COLOR.White};
          `}
        >
          <Col span={4}>
            <Space
              className={css`
                position: relative;
                height: 100%;
              `}
            >
              <Space
                className={css`
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  background-color: white;
                  border-radius: 0.5rem;
                  padding: 8px;

                  .ant-upload {
                    margin-bottom: unset !important;
                    margin-inline-end: unset !important;
                  }
                  .ant-upload-list-item-container {
                    margin: unset !important;
                  }
                `}
              >
                <UnloadImageForm
                  name='photo'
                  maxLength={1}
                  listType='picture-card'
                  disabled={true}
                />
              </Space>
            </Space>
          </Col>
          <Col span={20}>
            <Space className={'flex justify-between'}>
              <h4
                className={css`
                  margin-bottom: 1rem;
                `}
              >
                {data?.lastName} {data?.firstName}
              </h4>

              <Space>
                <Button>
                  <WechatFilled style={{ color: COLOR.White }} />
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Space>
    </FormProvider>
  );
}

export default InfoHeader;
