// @flow
import * as React from 'react';
import { Space } from '@org/ui';
import { getNameLanguage, useTranslation } from '@org/i18n';
type Props = {
  name: string;
  grade: string;

  subject: string[];
  timeStart: string;
  timeEnd: string;
  status: string;
};
export const ClassCard = ({ name, grade, subject, timeStart, timeEnd, status }: Props) => {
  const { t } = useTranslation();
  return (
    <Space>
      <Space>{name}</Space>
      <Space>{grade}</Space>
      <Space>
        {subject?.map((subject: string, index: number) => (
          <Space key={index}>{subject}</Space>
        ))}
      </Space>
      <Space>
        <span>{t('date.start')}</span>
        <span>{timeStart}</span>
      </Space>
      <Space>
        <span>{t('date.end')}</span>
        <span>{timeEnd}</span>
      </Space>
      <Space>{status}</Space>
    </Space>
  );
};
