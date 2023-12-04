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
import { COLOR, colorRandom } from '@org/utils';
import dayjs from 'dayjs';
import React, { useEffect, useTransition } from 'react';
import { useLazyFindCollaborationQuery } from '@org/store';
import { useParams } from 'react-router-dom';
import ScheduleApp from '../schedule/schedule.app';
import {TagsList} from "@org/core";
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
      label:t('class.schedule'),
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
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: t('class.Assignment'),
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
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
        <h6>
          Em/Mình tên là Phạm Thanh Tâm, hiện đang là lập trình viên. Em/Mình tốt nghiệp đại học
          chuyên ngành Chuyên nghành CNTT loại giỏi năm 2021, có chứng chỉ sư phạm quốc tế Tesol và
          hiện đã giảng dạy tiếng anh được gần 2 năm cho nhiều đối tượng, và cụ thể là tiếng anh
          giao tiếp cho người mất gốc, tiếng anh thiếu nhi, luyện thi các chứng chỉ quốc tế
          Starters, Movers, Flyers, Ket.
        </h6>
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
          Ngày Sinh
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
          Học Vấn
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
          Địa Chỉ
        </h6>
        <h6>
          {data?.address} - {data?.wards?.name} - {data?.wards?.districts?.name} -{' '}
          {data?.wards?.districts?.province?.name}{' '}
        </h6>
      </Space>

      <SkillCertifications data={data} />
    </Space>
  );
};
const SkillCertifications = ({ data }: any) => {
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
          Kỹ Năng
        </h6>
        <Space>
          <TagsList data={data?.tutorSkills} isReverse/>

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
          Chứng Chỉ
        </h6>
        <Space>
          <TagsList data={data?.tutorCertifications} isReverse/>

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
          Dạy Môn
        </h6>
        <Space>
          {data?.tutorGradeSubject?.map((item: any) => (
            <Tag color={colorRandom()}>
              {getNameLanguage(item?.subject?.nameVI, item?.subject?.nameEN)}
            </Tag>
          ))}
        </Space>
      </Space>
    </Space>
  );
};
