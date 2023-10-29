import i18next from 'i18next';

export const getNameLanguage = (nameVI: string, nameEN: string) =>
  i18next.language === 'en-EN' ? nameEN : nameVI;
