import { css } from '@emotion/css/macro';
import { getNameLanguage, i18nContant, useTranslation } from '@org/i18n';
import { Space, Tabs, TabsProps, Tag, TimeAvailability, timeAvailabilityFormat } from '@org/ui';
import { COLOR, RolesEnum, colorById, colorRandom } from '@org/utils';
import dayjs from 'dayjs';
import React from 'react';
import { TagsList } from '@org/core';
import { ifAnyGranted } from '@org/auth';
import { Classes } from '../classes';
const contentStyle: React.CSSProperties = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};

function Section({ data }: any) {
  console.log('🚀 ~ file: index.tsx:15 ~ Section ~ data:', data);
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: i18nContant('pro.info'),
      children: <Information data={data} />,
    },

    {
      key: '3',
      label: i18nContant('pro.classed'),
      children: <Classes data={data?.classes?.data} />,
    },
    {
      key: '4',
      label: i18nContant('pro.feedback'),
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <Space
      className={css`
        /* padding: 2.4rem; */
        /* background-color: ${COLOR.White}; */
        margin-top: 2rem;
      `}
    >
      <Tabs
        defaultActiveKey='1'
        items={items}
        onChange={onChange}
      />
    </Space>
  );
}

export default Section;
const Information = ({ data }: any) => {
  console.log('🚀 ~ file: index.tsx:60 ~ Information ~ data:', data);
  const { t } = useTranslation();
  return (
    <Space
      className={css`
        padding: 0 1rem;
      `}
    >
      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          Bio
        </h6>
        <h6>{data?.bio}</h6>
      </Space>
      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          {t('pro.birthday')}
        </h6>
        <h6>{dayjs('12/05/2001').format('DD-MM-YYYY')}</h6>
      </Space>

      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          {t('pro.grade')}
        </h6>
        <h6>Sư Phạm Kỹ Thuật</h6>
      </Space>
      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          {t('user.address')}
        </h6>
        <h6>
          {data?.address} - {data?.wards?.name} - {data?.wards?.districts?.name} -{' '}
          {data?.wards?.districts?.province?.name}{' '}
        </h6>
      </Space>
      <SkillCertifications data={data} />
      {data?.tutorTimeAvailability && (
        <>
          <h6
            className={css`
              min-width: 100px;
              font-weight: 700 !important;
              margin-top: 1rem;
              margin-bottom: 1rem;
            `}
          >
            {t('timeAvailability')}
          </h6>
          <TimeAvailability value={timeAvailabilityFormat(data?.tutorTimeAvailability)} />
        </>
      )}
    </Space>
  );
};
const SkillCertifications = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <Space>
      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          {t('skill')}
        </h6>
        <Space>
          {data?.tutorSkills?.map((item: any) => (
            <Tag color={colorById(item?.skill?.id)}>
              {getNameLanguage(item?.skill?.nameVI, item?.skill?.nameEN)}
            </Tag>
          ))}
        </Space>
      </Space>
      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          {t('certification')}
        </h6>
        <Space>
          {data?.tutorCertifications?.map((item: any) => (
            <Tag color={colorById(item?.certification?.id)}>
              {getNameLanguage(item?.certification?.nameVI, item?.certification?.nameEN)}
            </Tag>
          ))}
        </Space>
      </Space>
      <Space
        className={css`
          display: flex;
          margin-top: 1rem;
        `}
      >
        <h6
          className={css`
            min-width: 100px;
            font-weight: 700 !important;
          `}
        >
          {t('pro.tutor')}
        </h6>
        <Space>
          {data?.tutorGradeSubject?.map((item: any) => (
            <Tag color={colorById(item?.subject?.id)}>
              {getNameLanguage(item?.subject?.nameVI, item?.subject?.nameEN)}
            </Tag>
          ))}
        </Space>
      </Space>
    </Space>
  );
};
