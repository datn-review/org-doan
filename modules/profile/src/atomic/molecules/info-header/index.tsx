import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  BoxFlex,
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
import { COLOR, colorByIdUser, getImage } from '@org/utils';
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
        <Space
          className={css`
            background: ${colorByIdUser(data?.id)};
            height: 22vh;
            width: 100%;
            border-radius: 5px;
          `}
        >
          {/* <img
            src='https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-5/assets/user-profile-header-bg-ff6c2352.png'
            width={'100%'}
          /> */}
        </Space>
        <BoxFlex
          className={css`
            padding: 2.4rem;
            background-color: ${COLOR.White};
          `}
        >
          {/* <Col span={4}> */}
          <Space
            className={css`
              position: relative;
              height: 100%;
              width: 150px;
              /* flex: 1; */
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
                margin-bottom: -3.5rem;

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
          {/* </Col> */}
          {/* <Col span={20}> */}
          <Space className={'flex justify-between w-[100%] '}>
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
          {/* </Col> */}
        </BoxFlex>
      </Space>
    </FormProvider>
  );
}

export default InfoHeader;
