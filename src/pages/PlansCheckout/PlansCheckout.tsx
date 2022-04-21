import { FC, useEffect, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Container,
  Heading,
  Flex,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Plan } from '../../entities/Plan';
import PriceInCents from '../../components/PriceInCents';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';
import { getErrorMessages } from '../../utils/errors';
import { creditCardCheckoutSchema } from '../../schemas/payments';
import { useLoading } from '../../contexts/loading';
import api from '../../services/api';

declare const MercadoPago: any;

const PlansCheckout: FC = () => {
  const { state } = useLocation();

  const toast = useToast();

  const { pushLoading, popLoading } = useLoading();

  const plan = useMemo(() => {
    if (!state || !(state as any).plan || !(state as any).plan.id) {
      return null;
    }
    return (state as any).plan as Plan;
  }, [state]);

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardholderName: '',
      cardExpirationMonth: '',
      cardExpirationYear: '',
      securityCode: '',
      identificationType: 'CPF',
      identificationNumber: '',
    },
    onSubmit: async data => {
      if (!plan) {
        return;
      }
      pushLoading();
      try {
        creditCardCheckoutSchema.validateSync(data);
      } catch (err) {
        getErrorMessages(err).forEach(error => {
          toast({
            title: error.title,
            description: error.text,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
        popLoading();
        return;
      }

      let { cardNumber, identificationNumber } = data;
      cardNumber = cardNumber.replaceAll(' ', '');
      identificationNumber = identificationNumber
        .replaceAll('.', '')
        .replaceAll('-', '');

      const mp = new MercadoPago(
        'APP_USR-fb7f1794-aa4b-4b36-be2c-177c1d7ec5dd'
      );

      const { id } = await mp.createCardToken({
        ...data,
        cardNumber,
        identificationNumber,
      });

      const response = await api.post(`/api/plans/${plan.id}/approval/`, {
        card_token_id: id,
      });

      console.log(response);
      popLoading();

      alert(
        'Daqui pra frente não programei nada, e é somente um teste. Obrigado por testar <3'
      );
    },
  });

  useEffect(() => {
    if (!!document.querySelector('script#mp-sdk')) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.id = 'mp-sdk';
    document.head.appendChild(script);

    return () => {
      const script = document.querySelector('script#mp-sdk');
      if (!!script && !!script.parentElement) {
        script.parentElement.removeChild(script);
      }
    };
  }, []);

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  return (
    <Container maxW="120ch" mt="60px">
      <Flex my="40px">
        <Heading as="h1" size="lg">
          {plan.name}
        </Heading>
        <Spacer />
        <Heading as="h2" size="lg">
          <PriceInCents value={plan.monthly_price} />
          <Text fontSize="sm" display="inline">
            /mês
          </Text>
        </Heading>
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <InputMask
          label="Número do Cartão de Crédito"
          id="cardNumber"
          mask="9999 9999 9999 9999"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          placeholder="XXXX XXXX XXXX XXXX"
          mb="30px"
        />

        <Flex gap="20px" mb="30px">
          <InputMask
            label="Mês de Validade"
            id="cardExpirationMonth"
            mask="99"
            value={formik.values.cardExpirationMonth}
            onChange={formik.handleChange}
            placeholder="XX"
          />
          <InputMask
            label="Ano de Validade"
            id="cardExpirationYear"
            mask="9999"
            value={formik.values.cardExpirationYear}
            onChange={formik.handleChange}
            placeholder="XXXX"
          />
          <Input
            label="CVV"
            id="securityCode"
            minLength={3}
            maxLength={4}
            value={formik.values.securityCode}
            onChange={formik.handleChange}
          />
        </Flex>

        <Flex gap="20px" mb="30px">
          <Input
            label="Nome no Cartão"
            id="cardholderName"
            value={formik.values.cardholderName}
            onChange={formik.handleChange}
          />
          <InputMask
            label="CPF do Dono"
            id="identificationNumber"
            mask="999.999.999-99"
            value={formik.values.identificationNumber}
            onChange={formik.handleChange}
          />
        </Flex>

        <Button variant="primary-rounded" type="submit">
          Assinar
        </Button>
      </form>
    </Container>
  );
};

export default PlansCheckout;
