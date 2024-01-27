// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languageDetector, { LanguageDetectorType } from './languageDetector';



import enTranslations from '../../public/locales/en/en.json';
import mkTranslations from '../../public/locales/mk/mk.json';

i18n
    .use(Backend)
    .use({
        type: 'languageDetector',
        ...languageDetector,
    } as LanguageDetectorType)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            mk: { translation: mkTranslations },
        },
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
