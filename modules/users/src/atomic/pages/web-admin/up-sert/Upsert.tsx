import { css } from '@emotion/css';
import { useGetUserAdminQuery } from '@org/store/src/services/users.api';
import dayjs from 'dayjs';
import { UpsertUser } from '../../../organisms/up-sert-user';
import {
  BoxCenter,
  Button,
  IconDeleteAction,
  IconEditAction,
  Input,
  Pagination,
  Select,
  SelectLimitTable,
  Space,
  Table,
  Tag,
  useTable,
} from '@org/ui';
import { COLOR, COLOR_RGB, SiteMap, StatusEnum, StatusEnumColor, statusOption } from '@org/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch } from '@org/store';
import { useWebAdminContext } from '../web-admin.context';

function Upsert() {
  const { t } = useTranslation();

  const { setIdEdit, setIsUpsert, idEdit, isUpsert } = useWebAdminContext();

  // const { data, isLoading } = useGetUserAdminQuery({
  //   page: tableInstance.values.pagination.currentPage,
  //   limit: tableInstance.limit,
  //   status: filter.status,
  //   searchName: filter.name,
  // });

  return (
    <Space>
      <UpsertUser
        onClose={() => {
          setIsUpsert(false);
          setIdEdit(0);
        }}
        onSave={(values: any) => {
          setIsUpsert(false);
          setIdEdit(0);
        }}
        idEdit={idEdit}
        open={isUpsert}
      />
    </Space>
  );
}

export default Upsert;
