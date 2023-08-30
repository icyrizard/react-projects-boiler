import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en";
import nl from "@/locales/nl";

export const supportedLanguages = {
  "en-GB": {
    translation: en,
  },
  "nl-NL": {
    translation: nl,
  },
};

export const supportedLocales = Object.keys(supportedLanguages);

export const languageSettings = {
  fallbackLng: "en-GB",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: supportedLanguages,
};

i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(languageSettings);

export function getCurrentLanguage(): keyof typeof supportedLanguages {
  return i18n.language as keyof typeof supportedLanguages;
}

export default i18n;
