import { css } from '@emotion/css/macro';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  BoxCenter,
  H2,
  Section,
  SectionLayout,
  Space,
  Tabs,
  TabsProps,
  Tag,
  TextSection,
} from '@org/ui';
import { COLOR, DataTimeEnum, DayEnum, SiteMap, colorRandom, formatMoney } from '@org/utils';
import dayjs from 'dayjs';
import React, { useEffect, useTransition } from 'react';
import { useLazyFindCollaborationQuery } from '@org/store';
import { Link, useParams } from 'react-router-dom';
import ScheduleApp from '../schedule/schedule.app';
import { TagsList } from '@org/core';
import styled from '@emotion/styled/macro';
import { FeeInfomation } from './../../molecules/fee';
import { AssignmentCollap } from './../../molecules/assignment';

const contentStyle: React.CSSProperties = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};

function ClassesDetails() {
  const { t } = useTranslation();
  const [getData, { data }] = useLazyFindCollaborationQuery();

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    getData(id);
  }, [id]);

  const refetch = () => {
    getData(id);
  };
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('class.info'),
      children: <Information data={data} />,
    },
    {
      key: '2',
      label: t('class.schedule'),
      children: (
        <ScheduleApp
          data={data}
          refetch={refetch}
        />
      ),
    },
    {
      key: '3',
      label: t('class.fee.status'),
      children: <FeeInfomation payments={data?.payment} />,
    },
    {
      key: '4',
      label: t('class.Assignment'),
      children: <AssignmentCollap data={data} />,
    },
    {
      key: '5',
      label: t('class.Feedback'),
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <SectionLayout>
      <Section>
        <BoxCenter>
          <H2>{t('class.details')}</H2>
        </BoxCenter>
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
      </Section>
    </SectionLayout>
  );
}

export default ClassesDetails;
const Information = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <Space
      className={css`
        padding: 0 1rem;
      `}
    >
      <WrapItem>
        <Title>{t('tutor.title')}: </Title>
        <Link
          to={SiteMap.Profile.generate(data?.user?.id)}
          className={css`
            text-decoration-line: underline !important;
            color: ${COLOR.Primary} !important;
          `}
        >
          {data?.user?.lastName} {data?.user?.firstName}
        </Link>
      </WrapItem>
      <WrapItem>
        <Title>{t('student.title')}: </Title>
        <Link
          to={SiteMap.Profile.generate(data?.posts?.user?.id)}
          className={css`
            text-decoration-line: underline !important;
            color: ${COLOR.Primary} !important;
          `}
        >
          {data?.posts?.user?.lastName} {data?.posts?.user?.firstName}
        </Link>
      </WrapItem>

      <WrapItem>
        <Title>{t('classNew.fee')}: </Title>
        {formatMoney(data?.posts?.fee)}/{DayEnum[data?.posts?.perTime]}
      </WrapItem>

      <WrapItem>
        <Title>{t('classNew.dayWeek')}: </Title>
        {data?.posts?.dayWeek} {t('classNew.day')} ({DataTimeEnum[data?.posts?.timeDay]}/
        {t('classNew.day')})
      </WrapItem>

      <WrapItem>
        <Title>{t('classNew.address')}: </Title>
        {data?.posts?.address} - {data?.posts?.wards?.name} - {data?.posts?.wards?.districts?.name}{' '}
        - {data?.posts?.wards?.districts?.province?.name}
      </WrapItem>
      <WrapItem>
        <Title>{t('fee.time')}: </Title>
        {dayjs(data?.contractStartDate).format('DD/MM/YYYY')}
        {' - '}
        {dayjs(data?.contractEndDate).format('DD/MM/YYYY')}
      </WrapItem>
      <WrapItem>
        <Title>{t('classNew.grade')}: </Title>
        <TagsList
          data={data?.posts?.gradeLevels}
          isReverse
          bordered
        />
      </WrapItem>
      <WrapItem>
        <Title>{t('classNew.subject')}: </Title>
        <TagsList
          data={data?.posts?.subjects}
          bordered
        />
      </WrapItem>
      <WrapItem>
        <Title>{t('classNew.certification')}: </Title>
        <TagsList
          data={data?.posts?.certifications}
          isReverse
          bordered
        />
      </WrapItem>
      <WrapItem>
        <Title>{t('classNew.skill')}: </Title>
        <TagsList
          data={data?.posts?.skills}
          bordered
        />
      </WrapItem>
    </Space>
  );
};
const Title = styled.h6`
  min-width: 160px;
  font-weight: 700 !important;
`;

const WrapItem = styled.h6`
  display: flex;
  margin-top: 1rem;
`;
