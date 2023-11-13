import i18next from 'i18next';
import { Translation, useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

export const getNameLanguage = (nameVI: string, nameEN: string) =>
  i18next.language === 'en-EN' ? nameEN : nameVI;

export const i18nContant = (name: string) => {
  return <Translation>{(t) => t(`${name}`)}</Translation>;
};
