// languageDetector.ts
import {  InitOptions, Services } from 'i18next';

export type LanguageDetectorType = {
    type: 'languageDetector';
    init(services: Services, detectorOptions: InitOptions, i18nOptions: InitOptions): void;
    detect(): string;
    cacheUserLanguage(lng: string): void;
};

const languageDetector: LanguageDetectorType = {
    type: 'languageDetector',
    init( ) {
        // Add your initialization logic here if needed
    },
    detect() {
        // Add your logic to detect the language from cookies, localStorage, or any other source
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'en';
    },
    cacheUserLanguage() {
        // Add your logic to cache the user's selected language
    },
};

export default languageDetector;
