import React, { PropsWithChildren } from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import translationsVI from '../locales/vi/translations.json';
import settingsVI from '../locales/vi/settings.json';

import translationsEN from '../locales/en/translations.json';
import settingsEN from '../locales/en/settings.json';

function Provider({ children }: PropsWithChildren) {
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: localStorage.getItem('language') || 'en-EN',
    resources: {
      'vi-VN': {
        translation: { ...translationsVI, ...settingsVI },
      },
      'en-EN': {
        translation: { ...translationsEN, ...settingsEN },
      },
    },
  });
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default Provider;
