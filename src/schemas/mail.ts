import { object, string, boolean } from 'yup';

export const createOrEditMailSchema = object({
  name: string().required('Insira um nome válido.'),
  mail_user: string().required(),
  redirect_enabled: boolean().required(),
  redirect_to_my_email: boolean().required(),
  redirect_to: string().optional().email('Insira um e-mail válido'),
});
