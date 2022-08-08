import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt_BR from './pt_BR/texts.json';

export function setupTranslations() {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        pt_BR,
      },
      lng: 'pt_BR', // if you're using a language detector, do not define the lng option
      fallbackLng: 'pt_BR',

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
}
