import { getNameLanguage, useTranslation } from '@org/i18n';
import { useGetCertificationActiveQuery } from '@org/store';
import { SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import { useMemo } from 'react';
import { defauOptions } from './contants';
export const certificationImportFormat = (data: any) => {
  return data?.map((item: any) => item?.certification?.id) || [];
};
export function SelectCertification({ single = false, isDefault }: any) {
  const { data: dataCertification } = useGetCertificationActiveQuery({});

  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const certification = useMemo(() => {
    if (isDefault) {
      return [defauOptions, ...formatData({ data: dataCertification, name })];
    }
    return formatData({ data: dataCertification, name });
  }, [name, dataCertification]);

  return (
    <SelectForm
      size='middle'
      mode={single ? undefined : 'multiple'}
      name='certification'
      label={t('certification')}
      placeholder={t('please.select')}
      options={certification}
    />
  );
}
