import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './translations/en.json';
import es from './translations/es.json';

void i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    lng: Localization.getLocales?.()[0]?.languageCode ?? 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
