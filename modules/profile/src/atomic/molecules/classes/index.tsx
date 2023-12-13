import { useAppDispatch } from '@org/store';

import { css } from '@emotion/css';
import { TagsList } from '@org/core';
import { Editor } from '@org/editor';
import { i18next, useTranslation } from '@org/i18n';
import {
  BoxCenter,
  Button,
  Card,
  Col,
  EyeTwoTone,
  FormProvider,
  IconEye,
  ModalAntd,
  RateForm,
  Row,
  SIZE,
  Space,
  Tag,
  useForm,
  useTable,
  yupResolver,
} from '@org/ui';
import {
  COLOR,
  DataTimeEnum,
  DayEnum,
  SiteMap,
  StatusRegistration,
  StatusRegistrationColor,
} from '@org/utils';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

export function Classes(data: any) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  console.log('data', data);

  const dataFilter = useMemo(() => {
    return data?.data?.filter(
      (item: any) => item.status === 5 && dayjs(item.contractEndDate).isBefore(dayjs()),
    );
  }, [data?.data]);

  return (
    <Space
      className={css`
        padding: 1rem;
      `}
    >
      <If condition={isEmpty(dataFilter)}>
        <Then>{t('no.classes')}</Then>
        <Else>
          <Row gutter={[20, 20]}>
            {dataFilter?.map((item: any) => (
              <CardCollap
                item={item?.posts}
                data={item}
              />
            ))}
          </Row>
        </Else>
      </If>

      {/* <Table
        tableInstance={tableInstance}
        totalPage={1}
        columns={columns}
        data={data?.data}
      /> */}
    </Space>
  );
}
export const CardCollap = ({ item, data }: any) => {
  const { t } = useTranslation();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  return (
    <Col
      span={24}
      sm={12}
      lg={8}
      xl={6}
    >
      <Card
        title={item?.requestSummaryVI}
        bordered={true}
        className={css`
          line-height: 3rem;
          .ant-card-head {
            padding: 0 16px;
          }
          .ant-card-body {
            min-height: 380px;
            padding: 16px;
            /* overflow: scroll; */
          }
        `}
      >
        <Space>
          <b>{t('classNew.fee')}: </b>
          {item?.fee}/{DayEnum[item?.perTime]}
        </Space>

        <Space>
          <b>{t('classNew.dayWeek')}: </b>
          {item.dayWeek} {t('classNew.day')} ({DataTimeEnum[item.timeDay]}/{t('classNew.day')})
        </Space>

        <Space>
          <b>{t('classNew.address')}: </b>
          {/* {item.address} - {item?.wards?.name} - {item?.wards?.districts?.name} -{' '} */}
          {item?.wards?.districts?.province?.name}
        </Space>
        <Space>
          <b>{t('classNew.timeStart')}: </b>
          {dayjs(item.timeStart).format('DD-MM-YYYY')}
        </Space>
        <Space>
          <b>{t('classNew.grade')}: </b>
          <TagsList
            data={item?.gradeLevels}
            isReverse
            bordered
          />
        </Space>
        <Space>
          <b>{t('classNew.subject')}: </b>
          <TagsList
            data={item?.subjects}
            bordered
          />
        </Space>
        <Space>
          <b>{t('classNew.certification')}: </b>
          <TagsList
            data={item?.certifications}
            isReverse
            bordered
          />
        </Space>
        <Space>
          <b>{t('classNew.skill')}: </b>
          <TagsList
            data={item?.skills}
            bordered
          />
        </Space>
        <br />
        <Button
          // $variant={VARIANT.Pr}
          $size={SIZE.ExtraSmall}
          className={css`
            width: 100%;
          `}
          onClick={() => setIsOpenFeedback(true)}
        >
          <EyeTwoTone twoToneColor={COLOR.Primary} />
          {t('feedback')}
        </Button>
      </Card>
      <ModalAntd
        width={'80%'}
        open={isOpenFeedback}
        onCancel={() => setIsOpenFeedback(false)}
        footer={<></>}
      >
        <Feedback feeback={data?.feedback?.[0]}></Feedback>
      </ModalAntd>
    </Col>
  );
};

type IUpdate = {
  overallRating: number;
  interactionRating?: number;
  qualityRatting?: number;
  contentRatting?: number;
  presentationRating?: number;
};

const schema = yup.object({
  overallRating: yup.number().required(i18next.t('required.name')),
  //   nameEN: yup.string().required(i18next.t('required.name')),
  //   descriptionVI: yup.string(),
  //   descriptionEN: yup.string(),
  //   status: yup.number(),
});
type TypeName = keyof IUpdate;
const dataInit: IUpdate = {
  overallRating: 3,
  interactionRating: 3,
  qualityRatting: 3,
  contentRatting: 3,
  presentationRating: 3,
};

export function Feedback({ feeback }: any) {
  const { t } = useTranslation();
  const methods = useForm<IUpdate>({
    defaultValues: dataInit,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isEmpty(feeback)) {
      Object.entries(dataInit).forEach(([name, value]) => {
        const recordName = name as TypeName;

        const recordData = (feeback as IUpdate)?.[name as TypeName];

        methods.setValue(recordName, recordData || 0);
      });
    }
  }, [JSON.stringify(feeback)]);

  return (
    <>
      <FormProvider {...methods}>
        <Space
          className={css`
            text-align: center;
          `}
        >
          <RateForm
            name={'interactionRating'}
            label={t('interactionRating')}
            disabled={!!feeback}
          />
          <RateForm
            name={'qualityRatting'}
            label={t('qualityRatting')}
            disabled={!!feeback}
          />
          <RateForm
            name={'contentRatting'}
            label={t('contentRatting')}
            disabled={!!feeback}
          />
          <RateForm
            name={'presentationRating'}
            label={t('presentationRating')}
            disabled={!!feeback}
          />

          <RateForm
            name={'overallRating'}
            label={t('overallRating')}
            disabled={!!feeback}
          />
          <Space>{t('comment')}</Space>
        </Space>
        <Space
          className={css`
            padding: 1rem;
            border: 1px solid #d0cfcf;
            border-radius: 10px;
          `}
        >
          <Editor
            // onChange={(value) => setComment(value)}
            defaultValue={feeback?.comment || ''}
            isShow={feeback?.comment}
          />
        </Space>

        <br />
      </FormProvider>
    </>
  );
}
