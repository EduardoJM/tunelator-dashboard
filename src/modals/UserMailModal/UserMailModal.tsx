import { FC, useEffect, KeyboardEvent, useState } from 'react';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Collapse,
  FormControl,
  FormLabel,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import Button from '../../components/Common/Button';
import Input from '../../components/Forms/Input';
import InputMailUser from '../../components/Forms/InputMailUser';
import Checkbox from '../../components/Checkbox';
import { usePlan } from '../../contexts/plan';
import { UserMail } from '../../entities/UserMail';
import { getErrorMessages } from '../../utils/errors';
import { createMail, updateMail, validateUserMail } from '../../services/mails';
import { createOrEditMailSchema } from '../../schemas/mail';

export interface UserMailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userMail: UserMail | null;
}

interface FormProps {
  name: string;
  mail_user: string;
  redirect_enabled: boolean;
  redirect_to_my_email: boolean;
  redirect_to: string;
}

const UserMailModal: FC<UserMailModalProps> = ({
  isOpen,
  onClose,
  userMail,
}) => {
  const { plan } = usePlan();
  const toast = useToast();

  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

  const queryClient = useQueryClient();

  const [mailUserIsValid, setMailUserIsValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      mail_user: '',
      redirect_enabled: true,
      redirect_to_my_email: true,
      redirect_to: '',
    },
    onSubmit: data => console.log(data),
  });

  const createOrUpdateUserMailMutation = useMutation<
    unknown,
    unknown,
    FormProps
  >(
    async ({
      name,
      mail_user,
      redirect_enabled,
      redirect_to_my_email,
      redirect_to,
    }) => {
      try {
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

        createOrEditMailSchema.validateSync({
          name,
          mail_user,
          redirect_enabled,
          redirect_to_my_email,
          redirect_to,
        });

        if (!!userMail) {
          await updateMail(
            userMail.id,
            name,
            redirect_enabled,
            !redirect_to_my_email ? redirect_to || null : null
          );
        } else {
          await createMail(
            name,
            mail_user,
            redirect_enabled,
            !redirect_to_my_email ? redirect_to || null : null
          );
        }

        queryClient.invalidateQueries(['mails']);
        queryClient.refetchQueries(['mails']);
        queryClient.invalidateQueries('latest-mails');
        queryClient.refetchQueries('latest-mails');

        onClose();
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
      }
    }
  );

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
    createOrUpdateUserMailMutation.mutate(formik.values);
  };

  const handleBlur = async () => {
    const isValid = await validateUserMail(formik.values.mail_user);
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
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {!!userMail ? 'Editar Conta de E-mail' : 'Criar Conta de E-mail'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
              !!userMail ? 'Não é possível editar o nome do e-mail.' : undefined
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
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr="10px" onClick={onClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            isDisabled={!mailUserIsValid}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserMailModal;
