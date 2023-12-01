import { getNameLanguage, useTranslation } from '@org/i18n';
import { useGetSkillsActiveQuery } from '@org/store';
import { SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import React, { useMemo } from 'react';

export const skillImportFormat = (data: any) => {
  return data?.map((item: any) => item?.skill?.id) || [];
};

export function SelectSkill() {
  const { data: dataSkills } = useGetSkillsActiveQuery({});
  const { t } = useTranslation();

  const name = getNameLanguage('nameVI', 'nameEN');
  const skills = useMemo(() => {
    return formatData({ data: dataSkills, name });
  }, [name, dataSkills]);

  return (
    <SelectForm
      size='middle'
      mode='multiple'
      name='skills'
      label={t('skill')}
      options={skills}
      placeholder='Please Select Skill'
    />
  );
}
