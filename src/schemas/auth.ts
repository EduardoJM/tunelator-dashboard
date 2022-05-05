import { object, string, boolean } from 'yup';

export const loginSchema = object({
  email: string()
    .email('Insira um e-mail válido.')
    .required('Insira um e-mail válido.'),
  password: string().required('Insira sua senha.'),
  remember: boolean().required(),
});

export const signupSchema = object({
  email: string()
    .email('Insira um e-mail válido.')
    .required('Insira um e-mail válido.'),
  password: string().required('Insira sua senha.'),
  first_name: string().required('Insira um nome válido.'),
  last_name: string().required('Insira um sobrenome válido.'),
  accept_terms: boolean()
    .required('Você precisa concordar com os termos de uso.')
    .isTrue('Você precisa concordar com os termos de uso.'),
});
