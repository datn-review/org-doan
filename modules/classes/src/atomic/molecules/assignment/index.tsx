import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import { Button, SIZE, Space, Table, Tag, useTable } from '@org/ui';
import { StatusPay, StatusPayColor, StatusShowHideColor, formatMoney } from '@org/utils';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Payment } from '../payment';
import { useLazyFindAssignmentCollapQuery } from '@org/store';
import { LessonAssigenment } from './../../pages/schedule/container/Event/index';

export function AssignmentCollap({ data = [] }: any) {
  const { t } = useTranslation();
  const [findAssignmentCollap, { data: assignmentCollap }] = useLazyFindAssignmentCollapQuery();
  useEffect(() => {
    if (data.id) {
      findAssignmentCollap({ id: data.id });
    }
  }, [data]);

  return (
    <div>
      <LessonAssigenment
        data={assignmentCollap}
        isCollap
      />
    </div>
  );
}
