import { css } from '@emotion/css/macro';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  BoxCenter,
  Button,
  Dropdown,
  EllipsisOutlined,
  H2,
  ModalAntd,
  Section,
  SectionLayout,
  Space,
  TYPE_BUTTON,
  Tabs,
  TabsProps,
  Tag,
  TextSection,
} from '@org/ui';
import {
  COLOR,
  DataTimeEnum,
  DayEnum,
  EnumStatusCollap,
  RolesEnum,
  SiteMap,
  colorRandom,
  formatMoney,
} from '@org/utils';
import dayjs from 'dayjs';
import React, { useEffect, useState, useTransition } from 'react';
import {
  useCancelCollaborationMutation,
  useLazyFindCollaborationQuery,
  useUpdateCollaborationMutation,
} from '@org/store';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ScheduleApp from '../schedule/schedule.app';
import { TagsList, useMessage } from '@org/core';
import styled from '@emotion/styled/macro';
import { FeeInfomation } from './../../molecules/fee';
import { Feedback } from './../../molecules/feedback';
import { Contants, EnumTypeContact } from '../../molecules';

import { AssignmentCollap } from './../../molecules/assignment';
import qs from 'qs';
import { If, Then } from 'react-if';
import { ifAnyGranted } from '@org/auth';
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
  const [activeKey, setActiveKey] = useState('1');
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = qs.parse(location?.search, {
    ignoreQueryPrefix: true,
  });
  useEffect(() => {
    if (query?.tab) {
      setActiveKey(String(query?.tab));
    }
  }, [query]);

  const { id } = useParams();
  useEffect(() => {
    getData(id);
  }, [id]);

  const refetch = () => {
    getData(id);
  };
  const onChange = (key: string) => {
    const newQuery = { ...query, tab: key };
    navigate({
      search: qs.stringify(newQuery),
    });
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('class.info'),
      children: (
        <Information
          data={data}
          refetch={refetch}
        />
      ),
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
      children: <Feedback data={data} />,
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
            activeKey={activeKey}
          />
        </Space>
      </Section>
    </SectionLayout>
  );
}

export default ClassesDetails;
const Information = ({ data, refetch }: any) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [contants, setContants] = useState(null);
  const { messageSuccess } = useMessage();

  let status = data?.status;
  if (status === 5 && data?.contractEndDate && dayjs(data?.contractEndDate).isBefore(dayjs())) {
    status = 6;
  }

  const [updateStatus] = useUpdateCollaborationMutation();
  const [cancelColap] = useCancelCollaborationMutation();

  const handleCloseContact = () => {
    console.log(data);
    updateStatus({
      id: data?.id,
      body: {
        status: 7,
      },
    }).then(() => {
      refetch();
      messageSuccess(t('success'));
    });
  };

  const handleCancelCloseContact = () => {
    updateStatus({
      id: data?.id,
      body: {
        status: 5,
      },
    }).then(() => {
      refetch();
      setIsOpen(false);
      messageSuccess(t('success'));
    });
  };

  const handleConfirmCloseContact = () => {
    // handleConfirmCloseContact
    console.log(data);
    cancelColap({
      id: data?.id,
    }).then(() => setIsOpen(false));
  };
  const viewContract = () => {
    setContants(data);
  };

  const items: any = [
    {
      key: '1',
      label: <Space onClick={viewContract}>{t('request.contact.details')}</Space>,
      show: true,
    },
    {
      show:
        status !== EnumStatusCollap.ReqCloseContact &&
        status !== EnumStatusCollap.SuccessCloseContact &&
        status !== EnumStatusCollap.Completed &&
        ifAnyGranted([RolesEnum.STUDENT]),
      key: '2',
      label: <Space onClick={handleCloseContact}>{t('request.close.contact')}</Space>,
    },
    {
      show: status === EnumStatusCollap.ReqCloseContact && ifAnyGranted([RolesEnum.STUDENT]),
      key: '3',
      label: <Space onClick={handleCancelCloseContact}>{t('cancel.request.close.contact')}</Space>,
    },
    {
      show: status === EnumStatusCollap.ReqCloseContact && ifAnyGranted([RolesEnum.PESONAL_TUTOR]),
      key: '4',
      label: <Space onClick={() => setIsOpen(true)}>{t('success.close.contact')}</Space>,
    },
  ].filter((item: any) => item?.show);

  return (
    <Space
      className={css`
        padding: 0 1rem;
        position: relative;
      `}
    >
      <Space
        className={css`
          position: absolute;
          right: 0;
          top: 0;
        `}
      >
        <Dropdown
          className={css`
            cursor: pointer;
            * {
              font-size: 14px;
            }
          `}
          overlayClassName={css`
            width: 20rem;
          `}
          menu={{
            items: items,
          }}
          trigger={['click']}
          placement='bottomLeft'
          // arrow={{ pointAtCenter: true }}
        >
          <EllipsisOutlined
            className={css`
              transform: scale(1.6);
              display: flex;
              justify-content: center;
            `}
          />
        </Dropdown>
        <ModalAntd
          title={t('success.close.contact')}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={
            <BoxCenter>
              <Button onClick={handleConfirmCloseContact}>{t('confirm')}</Button>
              <Button
                $type={TYPE_BUTTON.Secondary}
                onClick={handleCancelCloseContact}
              >
                {t('cancel')}
              </Button>
            </BoxCenter>
          }
        >
          {t('close.contact.content')}
        </ModalAntd>
      </Space>
      <Contants
        type={EnumTypeContact.View}
        data={contants}
        close={() => setContants(null)}
        refetch={() => {
          //
        }}
      />
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
