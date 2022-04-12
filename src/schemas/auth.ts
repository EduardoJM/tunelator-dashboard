import { object, string, boolean } from 'yup';

export const loginSchema = object({
    email: string()
        .email('Insira um e-mail válido.')
        .required('Insira um e-mail válido.'),
    password: string().required('Insira sua senha.'),
    remember: boolean().required(),
});
