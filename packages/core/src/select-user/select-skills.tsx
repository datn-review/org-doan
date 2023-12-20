import { getNameLanguage, i18nContant, useTranslation } from '@org/i18n';
import { useGetSkillsActiveQuery } from '@org/store';
import { SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import React, { useMemo } from 'react';
import { defauOptions } from './contants';

export const skillImportFormat = (data: any) => {
  return data?.map((item: any) => item?.skill?.id) || [];
};
export const skillImportFormat2 = (data: any) => {
  return data?.map((item: any) => item?.id) || [];
};

export function SelectSkill({ single = false, isDefault }: any) {
  const { data: dataSkills } = useGetSkillsActiveQuery({});
  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const skills = useMemo(() => {
    if (isDefault) {
      return [defauOptions, ...formatData({ data: dataSkills, name })];
    }
    return formatData({ data: dataSkills, name });
  }, [name, dataSkills]);

  return (
    <SelectForm
      size='middle'
      mode={single ? undefined : 'multiple'}
      name='skills'
      label={t('skill')}
      options={skills}
      placeholder={t('please.select')}
    />
  );
}
