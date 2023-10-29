import { css } from '@emotion/css';
import {
  Button,
  Col,
  FormProvider,
  Row,
  Space,
  UnloadImageForm,
  UploadImage,
  useForm,
} from '@org/ui';
import { COLOR } from '@org/utils';
import React from 'react';

function InfoHeader() {
  const methods = useForm<any>({
    defaultValues: { photo: [] },
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
                />
              </Space>
            </Space>
          </Col>
          <Col span={20}>
            <h4
              className={css`
                margin-bottom: 1rem;
              `}
            >
              Tam Dep Trai
            </h4>
            <Space className={'flex justify-between'}>
              <Space className={'flex gap-1'}>
                <Space>Toán Lý Văn</Space>
                <Space>Toán Lý Văn</Space>
                <Space>Toán Lý Văn</Space>
              </Space>
              <Space>
                <Button>Connected</Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Space>
    </FormProvider>
  );
}

export default InfoHeader;
