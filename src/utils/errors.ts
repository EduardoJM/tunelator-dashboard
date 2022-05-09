import { ValidationError } from 'yup';

export interface Error {
  title: string;
  text: string;
}

export const fieldsMapping = {
  email: 'E-mail',
  password: 'Senha',
};

export function getErrorMessages(err: any): Error[] {
  if (err instanceof ValidationError) {
    return err.errors.map(text => ({ title: 'Oopps!', text }));
  } else if (!!err.response) {
    if (typeof err.response.data === 'string') {
      return [
        {
          title: 'Oopps!',
          text: 'Não foi possível completar a operação.',
        },
      ];
    }
    const data = err.response.data as any;
    if (Object.prototype.hasOwnProperty.call(data, 'detail')) {
      return [
        {
          title: 'Oopps!',
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
      title: 'Oopps!',
      text: 'Não foi possível completar a operação.',
    },
  ];
}
