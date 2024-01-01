// @flow
import * as React from 'react';
import {
  AlertTwoTone,
  BookTwoTone,
  Button,
  Card,
  ClockCircleTwoTone,
  Col,
  EditFilled,
  EnvironmentTwoTone,
  EyeTwoTone,
  MoneyCollectOutlined,
  MoneyCollectTwoTone,
  PieChartTwoTone,
  SIZE,
  SnippetsTwoTone,
  Space,
  Tag,
  VARIANT,
} from '@org/ui';
import {
  COLOR,
  colorById,
  colorRandom,
  DataTimeEnum,
  DayEnum,
  formatMoney,
  RolesEnum,
  SiteMap,
} from '@org/utils';
import dayjs from 'dayjs';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { css, cx } from '@emotion/css';
import { Link } from 'react-router-dom';
import { TagsList } from '@org/core';
import { ifAnyGranted } from '@org/auth';
import grade1 from '../../assets/grade/0.png';
import grade2 from '../../assets/grade/1.png';
import grade3 from '../../assets/grade/2.png';
import grade4 from '../../assets/grade/3.png';
import grade5 from '../../assets/grade/4.png';
import grade6 from '../../assets/grade/5.png';
import grade7 from '../../assets/grade/6.png';
import grade8 from '../../assets/grade/7.png';
import grade9 from '../../assets/grade/8.png';
import grade10 from '../../assets/grade/9.png';
import grade11 from '../../assets/grade/10.png';
import grade12 from '../../assets/grade/11.png';
const images = [
  {
    key: 1,
    value: grade1,
  },
  {
    key: 2,
    value: grade2,
  },
  {
    key: 3,
    value: grade3,
  },
  {
    key: 4,
    value: grade4,
  },
  {
    key: 5,
    value: grade5,
  },
  {
    key: 6,
    value: grade6,
  },
  {
    key: 7,
    value: grade7,
  },
  {
    key: 8,
    value: grade8,
  },
  {
    key: 9,
    value: grade9,
  },
  ,
  {
    key: 10,
    value: grade10,
  },
  {
    key: 11,
    value: grade11,
  },
  {
    key: 12,
    value: grade12,
  },
];

type Props = {};
export const CardPost = ({ item, handleClick }: any) => {
  const { t } = useTranslation();

  const img = [...images.reverse()]?.find((img) => {
    return item?.gradeLevels?.[0]?.nameVI?.includes(`${img?.key}`);
  }) || {
    key: 1,
    value: grade1,
  };

  return (
    <Col
      span={24}
      sm={12}
      md={12}
      lg={8}
      xl={6}
    >
      <Card
        bordered={true}
        className={css`
          line-height: 3rem;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0px 0 4px rgba(108, 108, 108, 0.6);
          height: 100%;
          &:hover {
            .button-group {
              display: flex !important;
            }
          }

          .ant-card-body {
            min-height: 380px;
            padding: 0;
            overflow: hidden;
          }
        `}
      >
        <img
          src={img.value}
          className={css`
            width: 100%;
            object-fit: cover;
          `}
        />
        <Space
          className={css`
            padding: 10px;
          `}
        >
          <Space
            className={css`
              font-size: 17px;
            `}
          >
            <b> {item?.requestSummaryVI}</b>
          </Space>
          <Space>
            <MoneyCollectTwoTone twoToneColor={COLOR.Primary} /> {formatMoney(item?.fee)}/
            {DayEnum[item?.perTime]}
          </Space>

          <Space>
            <AlertTwoTone twoToneColor={COLOR.Primary} /> {item.dayWeek} {t('classNew.day')}/
            {t('week')} ({DataTimeEnum[item.timeDay]}/{t('classNew.day')})
          </Space>

          <Space>
            <EnvironmentTwoTone twoToneColor={COLOR.Primary} />{' '}
            {item?.wards?.districts?.province?.name}
          </Space>
          <Space>
            <ClockCircleTwoTone twoToneColor={COLOR.Primary} />{' '}
            {dayjs(item.timeStart).format('DD-MM-YYYY')}
          </Space>

          <Space>
            {/* <b>{t('classNew.subject')}: </b> */}
            <BookTwoTone twoToneColor={COLOR.Primary} />{' '}
            <TagsList
              data={item?.subjects}
              bordered
            />
          </Space>
          <Space>
            {/* <b>{t('classNew.certification')}: </b> */}
            <SnippetsTwoTone twoToneColor={COLOR.Primary} />{' '}
            <TagsList
              data={item?.certifications}
              isReverse
              bordered
            />
          </Space>
          <Space>
            <PieChartTwoTone twoToneColor={COLOR.Primary} /> {/* <b>{t('classNew.skill')}: </b> */}
            <TagsList
              data={item?.skills}
              bordered
            />
          </Space>
          <Space
            className={cx(
              css`
                position: absolute;
                /* left: 16px; */
                bottom: 0;
                /* margin-top: 2rem; */
                display: flex;
                height: 7rem;
                background: white;
                border-top-right-radius: 20px;
                border-top-left-radius: 20px;
                border-top: 4px solid ${COLOR.Primary};
                box-shadow: -2px 0 4px rgba(0, 0, 0, 0.6);
                gap: 1rem;
                button {
                  padding: 9px !important;
                }
                left: 0;
                /* width: calc(100% - 32px); */
                width: 100%;
                padding: 16px;
                display: none;
                flex-wrap: wrap;
              `,
              'button-group',
            )}
          >
            <Button
              $variant={VARIANT.Outlined}
              $size={SIZE.ExtraSmall}
              className={css`
                flex: 1;
                background: #ff5520 !important;
                border: none !important;

                color: #fff !important;
              `}
              onClick={() => handleClick('tutor', item?.id)}
            >
              {t('list.tutor.register.post')}
            </Button>

            <Button
              onClick={() => handleClick('edit', item?.id)}
              $size={SIZE.ExtraSmall}
              className={css`
                flex: 1;
              `}
            >
              <EditFilled />
              {t('edit')}
            </Button>
          </Space>
        </Space>
      </Card>
    </Col>
  );
};
