import { getNameLanguage, useTranslation } from '@org/i18n';
import { useGetCertificationActiveQuery, useGetGradeLevelActiveQuery } from '@org/store';
import { SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import { useMemo } from 'react';
export const gradeImportFormat = (data: any) => {
  return data?.map((item: any) => item?.gradeLevel?.id) || [];
};
export function SelectGrade() {
  const { data } = useGetGradeLevelActiveQuery({});

  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const grade = useMemo(() => {
    return formatData({ data: data, name });
  }, [name, data]);

  return (
    <SelectForm
      size='middle'
      name='gradeLevel'
      label={t('grade')}
      placeholder={t('select.please')}
      options={grade}
    />
  );
}
