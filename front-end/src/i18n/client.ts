import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        common: require('../../public/locales/en/common.json')
      },
      es: {
        common: require('../../public/locales/es/common.json')
      }
    }
  });

export default i18next;