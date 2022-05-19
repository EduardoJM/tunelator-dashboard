import { FC, useEffect, useRef, useState } from 'react';
import {
  Box,
  Collapse,
  FormControl,
  FormLabel,
  useToast,
  useBreakpointValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Button, LoadingIndicatorBox } from '../../components';
import Input from '../../components/Forms/Input';
import InputMailUser from '../../components/Forms/InputMailUser';
import Checkbox from '../../components/Checkbox';
import { usePlan } from '../../contexts/plan';
import { UserMail } from '../../entities/UserMail';
import { validateUserMailAccount } from '../../services/api/mailAccounts';

import {
  useCreateUserMailMutation,
  useUpdateUserMailMutation,
} from '../../services/mutations';

export interface UserMailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userMail: UserMail | null;
}

const UserMailModal: FC<UserMailModalProps> = ({
  isOpen,
  onClose,
  userMail,
}) => {
  const { plan } = usePlan();
  const toast = useToast();

  const cancelRef = useRef<any>(null);

  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

  const [mailUserIsValid, setMailUserIsValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      mail_user: '',
      redirect_enabled: true,
      redirect_to_my_email: true,
      redirect_to: '',
    },
    onSubmit: () => {},
  });

  const createUserMailMutation = useCreateUserMailMutation(onClose);
  const updateUserMailMutation = useUpdateUserMailMutation(onClose);

  useEffect(() => {
    if (!userMail) {
      formik.setValues({
        redirect_enabled: true,
        mail_user: '',
        name: '',
        redirect_to: '',
        redirect_to_my_email: true,
      });
      setMailUserIsValid(false);
      return;
    }
    formik.setValues({
      redirect_enabled: userMail.redirect_enabled,
      mail_user: userMail.mail_user,
      name: userMail.name,
      redirect_to: userMail.redirect_to || '',
      redirect_to_my_email: !userMail.redirect_to,
    });
    setMailUserIsValid(true);
  }, [userMail]);

  const handleSave = () => {
    if (!mailUserIsValid) {
      toast({
        title: 'Oopps!',
        description:
          'Esse nome de conta não está disponível, tente mudar um pouco.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!!userMail) {
      updateUserMailMutation.mutate({ id: userMail.id, ...formik.values });
      return;
    }

    createUserMailMutation.mutate(formik.values);
  };

  const handleBlur = async () => {
    const isValid = await validateUserMailAccount(formik.values.mail_user);
    setMailUserIsValid(isValid);
    if (!isValid) {
      toast({
        title: 'Oopps!',
        description:
          'Esse nome de conta não está disponível, tente mudar um pouco.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {!!userMail ? 'Editar Conta de E-mail' : 'Criar Conta de E-mail'}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Input
              label="Identificador da Conta"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              mb="30px"
            />

            <InputMailUser
              label="Nome da conta"
              id="mail_user"
              isDisabled={!!userMail}
              helpText={
                !!userMail
                  ? 'Não é possível editar o nome do e-mail.'
                  : undefined
              }
              value={formik.values.mail_user}
              onChange={formik.handleChange}
              onBlur={handleBlur}
            />

            {plan?.allow_custom_redirect && (
              <>
                <FormControl mt="50px" display="flex" alignItems="center">
                  <Checkbox
                    id="redirect_to_my_email"
                    isChecked={formik.values.redirect_to_my_email}
                    onChange={formik.handleChange}
                  />
                  <FormLabel htmlFor="redirect_to_my_email" ml="10px" mb="0">
                    Redirecionar para o meu e-mail
                  </FormLabel>
                </FormControl>

                <Box mt="10px">
                  <Collapse
                    in={!formik.values.redirect_to_my_email}
                    animateOpacity
                  >
                    <Input
                      label="Redirecionar para"
                      id="redirect_to"
                      value={formik.values.redirect_to}
                      onChange={formik.handleChange}
                    />
                  </Collapse>
                </Box>
              </>
            )}

            <FormControl mt="50px" display="flex" alignItems="center">
              <Checkbox
                id="redirect_enabled"
                isChecked={formik.values.redirect_enabled}
                onChange={formik.handleChange}
              />
              <FormLabel htmlFor="redirect_enabled" ml="10px" mb="0">
                Habilitado?
              </FormLabel>
            </FormControl>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} variant="ghost" mr="10px" onClick={onClose}>
              Fechar
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              isDisabled={!mailUserIsValid}
            >
              Salvar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default UserMailModal;
