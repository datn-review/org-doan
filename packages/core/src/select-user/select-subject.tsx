import { getNameLanguage, useTranslation } from '@org/i18n';
import {
  useGetCertificationActiveQuery,
  useGetGradeLevelActiveQuery,
  useGetSubjectActiveQuery,
} from '@org/store';
import { SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import { useMemo } from 'react';
export const subjectImportFormat = (data: any) => {
  return data?.map((item: any) => item?.subject?.id) || [];
};
export function SelectSubject() {
  const { data } = useGetSubjectActiveQuery({});

  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const subject = useMemo(() => {
    return formatData({ data: data, name });
  }, [name, data]);

  return (
    <SelectForm
      size='middle'
      name='subject'
      label={t('subject')}
      placeholder={t('select.please')}
      options={subject}
    />
  );
}
