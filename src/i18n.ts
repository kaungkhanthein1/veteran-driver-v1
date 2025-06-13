import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Tolgee, DevTools, I18nextPlugin } from '@tolgee/i18next';

// Import your translation files
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';
import koTranslation from './locales/ko.json';
import jaTranslation from './locales/ja.json';

const tolgee = Tolgee()
  .use(I18nextPlugin())
  .use(DevTools())
  .init({
    apiUrl: 'https://app.tolgee.io',
    apiKey: 'tgpak_ge4donbrl5zw2ojxgjxgc4tnnjrdi3zqnq2to5bzobutcyzzobxq',
    language: 'en',
    fallbackLanguage: 'en',
  });

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      zh: {
        translation: zhTranslation
      },
      ko: {
        translation: koTranslation
      },
      ja: {
        translation: jaTranslation
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

// Connect Tolgee to i18next
tolgee.run();

export { tolgee };
export default i18n; 