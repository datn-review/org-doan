import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  useGetGradeLevelActiveQuery,
  useGetSkillsActiveQuery,
  useGetSubjectActiveQuery,
} from '@org/store';
import { CascaderPanelForm, SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import React, { useMemo } from 'react';

export const gradeSubjectImportFormat = (data: any) => {
  return (
    data?.map((item: any) =>
      item?.grade.id ? [item?.subject?.id, item?.grade.id] : [item?.subject?.id],
    ) || []
  );
};
export const gradeSubjectExport = (data: any, grade?: any) => {
  return data?.map(([subject, grade]: any) => `${subject}__${grade || 0}`) || [];
};

export function SelectGradeSubject() {
  const { data: dataSubject } = useGetSubjectActiveQuery({});

  const { data: dataGrade } = useGetGradeLevelActiveQuery({});
  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');

  const grade = useMemo(() => {
    return formatData({ data: dataGrade, name });
  }, [name, dataGrade]);

  const subject = useMemo(() => {
    return formatData({ data: dataSubject, name });
  }, [name, dataSubject]);

  const gradeSubject = useMemo(() => {
    if (grade && subject)
      return subject?.map((subject: any) => ({
        ...subject,
        children: grade,
      }));

    return [];
  }, [subject, grade]);

  return (
    <CascaderPanelForm
      size='large'
      multiple
      name='tutorGradeSubject'
      label={t('tutorGradeSubject')}
      options={gradeSubject}
      placeholder='Please Grade Subject'
    />
  );
}
