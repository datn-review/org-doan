// @flow
import * as React from 'react';
import { Button, Card, Col, EditFilled, EyeTwoTone, SIZE, Space, Tag, VARIANT } from '@org/ui';
import { COLOR, colorById, colorRandom, DataTimeEnum, DayEnum, SiteMap } from '@org/utils';
import dayjs from 'dayjs';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import { TagsList } from '@org/core';

type Props = {};
export const CardClassNew = ({ item, registerForClass }: any) => {
  const { t } = useTranslation();

  return (
    <Col
      span={24}
      md={12}
      lg={8}
    >
      <Card
        title={item?.requestSummaryVI}
        bordered={true}
        className={css`
          line-height: 3rem;
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
          {item.address}- {item?.wards?.name}
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
          />
        </Space>
        <Space>
          <b>{t('classNew.subject')}: </b>
          <TagsList data={item?.subjects} />
        </Space>
        <Space>
          <b>{t('classNew.certification')}: </b>
          <TagsList
            data={item?.certifications}
            isReverse
          />
        </Space>
        <Space>
          <b>{t('classNew.skill')}: </b>
          <TagsList data={item?.skills} />
        </Space>
        <Space
          className={css`
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
            button {
              padding: 9px !important;
            }
            flex-wrap: wrap;
          `}
        >
          <Link to={SiteMap.ClassNew.Details.generate(item.id)}>
            <Button
              $variant={VARIANT.Outlined}
              $size={SIZE.ExtraSmall}
            >
              <EyeTwoTone twoToneColor={COLOR.Primary} />
              {t('details')}
            </Button>
          </Link>
          <Button
            onClick={registerForClass(item?.id, item?.user?.id)}
            $size={SIZE.ExtraSmall}
          >
            <EditFilled />
            {t('classNew.register')}
          </Button>
        </Space>
      </Card>
    </Col>
  );
};
