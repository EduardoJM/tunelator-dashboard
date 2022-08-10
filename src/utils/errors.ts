import { ValidationError } from 'yup';
import i18n from 'i18next';

export interface Error {
  title: string;
  text: string;
}

export const fieldsMapping = {
  email: i18n.t('fields.email'),
  password: i18n.t('fields.password'),
};

export function getErrorMessages(err: any): Error[] {
  if (err instanceof ValidationError) {
    return err.errors.map(text => ({ title: i18n.t('errors.title'), text }));
  } else if (!!err.response) {
    if (typeof err.response.data === 'string') {
      return [
        {
          title: i18n.t('errors.title'),
          text: i18n.t('errors.default'),
        },
      ];
    }
    const data = err.response.data as any;
    if (Object.prototype.hasOwnProperty.call(data, 'detail')) {
      return [
        {
          title: i18n.t('errors.title'),
          text: String(data.detail),
        },
      ];
    }
    const keys = Object.keys(data).map(key => {
      const title = Object.prototype.hasOwnProperty.call(fieldsMapping, key)
        ? String((fieldsMapping as any)[key])
        : key;
      const text = String(data[key]);
      return { title, text };
    });
    if (keys.length > 0) {
      return keys;
    }
  }
  return [
    {
      title: i18n.t('errors.title'),
      text: i18n.t('errors.default'),
    },
  ];
}
