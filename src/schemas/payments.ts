import { object, string, boolean } from 'yup';

export const creditCardCheckoutSchema = object({
  cardNumber: string()
    .required('Insira o número do cartão.')
    .matches(
      /^\d{4} \d{4} \d{4} \d{4}$/i,
      'Insira um número de cartão válido.'
    ),
  cardholderName: string()
    .required('Insira o nome impresso no cartão.')
    .matches(
      /\w+ \w+/i,
      'O nome impresso no cartão precisa de nome e sobrenome.'
    ),
  cardExpirationMonth: string()
    .required('Insira o mês de validade do cartão.')
    .matches(
      /^\d{2}$/i,
      'Insira o mês de validade do cartão com dois digitos.'
    ),
  cardExpirationYear: string()
    .required('Insira o ano de validade do cartão.')
    .matches(
      /^\d{4}$/i,
      'Insira o ano de validade do cartão com quatro digitos.'
    ),
  securityCode: string().required('Insira o CVV do cartão.'),
  identificationNumber: string()
    .required('Insira o CPF do dono do cartão.')
    .matches(/^\d{3}\.\d{3}.\d{3}-\d{2}$/i, 'Insira um CPF válido.'),
});
