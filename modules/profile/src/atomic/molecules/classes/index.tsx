import {
  clearActiveMenu,
  setActiveGroup,
  setActiveSubGroup,
  useAppDispatch,
  useLazyGetClassesQuery,
} from '@org/store';

import { css } from '@emotion/css';
import { TagsList, useCRUDContext, useMessageHook, useUpdateEffect } from '@org/core';
import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  BoxCenter,
  Dropdown,
  EllipsisOutlined,
  H2,
  IconEye,
  Input,
  Section,
  SectionLayout,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  useTable,
} from '@org/ui';
import {
  colorRandom,
  EnumStatusCollap,
  SiteMap,
  StatusEnum,
  statusOption,
  StatusRegistration,
  StatusRegistrationColor,
} from '@org/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { If, Then } from 'react-if';

export function Classes(data: any) {
  const tableInstance = useTable({
    initialSortValue: {
      sortBy: '',
      sortDirection: '',
    },
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  console.log('data', data);

  const columns = [
    {
      title: t('summary'),
      dataIndex: 'requestSummaryVI',
      sorter: true,
      render: (_: string, record: any) => <>{record?.posts?.requestSummaryVI}</>,
    },
    {
      title: t('subject'),
      dataIndex: 'subject',

      render: (_: string, record: any) => (
        <>
          <TagsList
            data={record?.posts?.subjects}
            isReverse={true}
          />
        </>
      ),
    },
    {
      title: t('grade'),
      dataIndex: 'grade',

      render: (_: string, record: any) => (
        <>
          <TagsList data={record?.posts?.gradeLevels} />
        </>
      ),
    },

    {
      title: t('user.createdAt'),
      dataIndex: 'updatedAt',
      sorter: true,
      render: (_createdAt: string) => <>{dayjs(_createdAt).format('DD/MM/YYYY')}</>,
    },

    {
      title: t('user.status'),
      sorter: true,
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag
          color={StatusRegistrationColor[record?.status as keyof typeof StatusRegistrationColor]}
        >
          {t(StatusRegistration[record?.status as keyof typeof StatusRegistration])}
        </Tag>
      ),
    },

    {
      title: t('user.action'),
      dataIndex: '',
      align: 'center',
      render: (_: any, record: any) => (
        <BoxCenter>
          <Link
            to={SiteMap.Manage.Classes.Details.generate(record?.id || 0)}
            className={css`
              color: #5c5b68 !important;
            `}
          >
            <IconEye />
          </Link>
        </BoxCenter>
      ),
    },
  ];

  return (
    <SectionLayout>
      <Section>
        <Table
          tableInstance={tableInstance}
          totalPage={1}
          columns={columns}
          data={data?.data}
        />
      </Section>
    </SectionLayout>
  );
}
