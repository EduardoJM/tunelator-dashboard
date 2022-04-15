import { object, string, boolean } from 'yup';

export const createOrEditMailSchema = object({
  name: string().required('Insira um nome válido.'),
  redirect_enabled: boolean().required(),
});
