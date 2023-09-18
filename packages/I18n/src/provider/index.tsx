import React, { ReactNode } from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import translationsVI from "../locales/vi/translations.json";
import translationsEN from "../locales/en/translations.json";

function Provider({ children }: { children: ReactNode }) {
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: "vi-VN",
    resources: {
      "vi-VN": {
        translation: translationsVI,
      },
      "en-EN": {
        translation: translationsEN,
      },
    },
  });
  console.log("🚀 ~ file: index.tsx:20 ~ i18next.use ~ i18next:", i18next);
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default Provider;
