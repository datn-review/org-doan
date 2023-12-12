// @flow
import * as React from 'react';
import {
  Button,
  Card,
  Col,
  EditFilled,
  EyeTwoTone,
  SIZE,
  Space,
  Tag,
  UserHeaderProfile,
  VARIANT,
} from '@org/ui';
import {
  COLOR,
  colorById,
  colorRandom,
  DataTimeEnum,
  DayEnum,
  RolesEnum,
  SiteMap,
} from '@org/utils';
import dayjs from 'dayjs';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import { ifAnyGranted } from '@org/auth';

type Props = {};
export const CardTutor = ({ item }: any) => {
  console.log('🚀 ~ file: Card.tsx:33 ~ CardTutor ~ item:', item);
  const { t } = useTranslation();

  return (
    <Col
      span={24}
      md={12}
      lg={12}
      xl={8}
    >
      <Card
        title={<UserHeaderProfile user={item} />}
        bordered={true}
        className={css`
          line-height: 3rem;
          .ant-card-head {
            padding: 0 16px;
          }
          .ant-card-body {
            min-height: 200px;
            padding: 16px;
            /* overflow: scroll; */
          }
        `}
      >
        {/* <Space>
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
        </Space> */}
        <Space>
          <b>{t('tutor.dateofbirth')}: </b>
          <span>5/12/2001</span>
        </Space>
        <Space>
          <b>{t('tutor.address')}: </b>
          <span>Phú Ninh-Quảng Nam</span>
        </Space>
        <Space>
          <b>{t('classNew.certification')}: </b>
          <TagsList
            data={item?.tutorCertifications}
            isReverse
            bordered
            name='certification'
          />
        </Space>
        <Space>
          <b>{t('classNew.skill')}: </b>
          <TagsList
            data={item?.tutorSkills}
            bordered
            name='skill'
          />
        </Space>
        <Space>
          <b>{t('tutor.bio')}: </b>
          <span> Mình Hehe</span>
        </Space>
        <Space>
          <b>{t('tutor.quatity.class')}: </b>
          <span>10</span>
        </Space>
        <Space>
          <b>{t('tutor.rating')}: </b>
          <span>10</span>
        </Space>
        <Space
          className={css`
            position: absolute;
            left: 24px;
            bottom: 24px;
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
            button {
              padding: 9px !important;
            }
            width: calc(100% - 48px);

            flex-wrap: wrap;
          `}
        >
          {/* <Link
            to={SiteMap.ClassNew.Details.generate(item.id)}
            className={css`
              flex: 1;
            `}
          >
            <Button
              $variant={VARIANT.Outlined}
              $size={SIZE.ExtraSmall}
              className={css`
                width: 100%;
              `}
            >
              <EyeTwoTone twoToneColor={COLOR.Primary} />
              {t('details')}
            </Button>
          </Link> */}
        </Space>
      </Card>
    </Col>
  );
};
const TagsList = ({
  data,
  isReverse = false,
  bordered = false,
  name = '',
}: {
  data: any;
  isReverse?: boolean;
  bordered?: boolean;
  name?: string;
}) => {
  return (
    <>
      {data?.map((item: any) => (
        <Tag
          bordered={bordered}
          color={colorById(item[name].id, isReverse)}
        >
          {getNameLanguage(item[name].nameVI, item[name].nameEN)}
        </Tag>
      ))}
    </>
  );
};
