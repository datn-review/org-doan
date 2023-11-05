import { getNameLanguage, useTranslation } from '@org/i18n';
import { useGetCertificationActiveQuery } from '@org/store';
import { SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import { useMemo } from 'react';
export const certificationImportFormat = (data: any) => {
  return data?.map((item: any) => item?.certification?.id) || [];
};
export function SelectCertification() {
  const { data: dataCertification } = useGetCertificationActiveQuery({});

  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const certification = useMemo(() => {
    return formatData({ data: dataCertification, name });
  }, [name, dataCertification]);

  return (
    <SelectForm
      size='large'
      mode='multiple'
      name='certification'
      label={t('Certification')}
      placeholder='Please Select Certification'
      options={certification}
    />
  );
}
