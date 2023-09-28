import React, { PropsWithChildren } from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import translationsVI from "../locales/vi/translations.json";
import translationsEN from "../locales/en/translations.json";

function Provider({ children }: PropsWithChildren) {
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: "en-EN",
    resources: {
      "vi-VN": {
        translation: translationsVI,
      },
      "en-EN": {
        translation: translationsEN,
      },
    },
  });
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default Provider;
