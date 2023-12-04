// @flow
import * as React from 'react';
import { Button, Card, Col, EditFilled, EyeTwoTone, SIZE, Space, Tag, VARIANT } from '@org/ui';
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
import { TagsList } from '@org/core';
import { ifAnyGranted } from '@org/auth';

type Props = {};
export const CardClassNew = ({ item, registerForClass }: any) => {
  const { t } = useTranslation();

  return (
    <Col
      span={24}
      md={12}
      lg={12}
      xl={8}
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
          <Link
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
          </Link>
          {ifAnyGranted([RolesEnum.PESONAL_TUTOR]) && (
            <Button
              onClick={registerForClass(item?.id, item?.user?.id)}
              $size={SIZE.ExtraSmall}
              className={css`
                flex: 1;
              `}
            >
              <EditFilled />
              {t('classNew.register')}
            </Button>
          )}
        </Space>
      </Card>
    </Col>
  );
};
