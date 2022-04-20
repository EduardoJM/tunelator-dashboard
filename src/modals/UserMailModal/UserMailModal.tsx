import { FC, useEffect, KeyboardEvent, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMailUser from '../../components/InputMailUser';
import Checkbox from '../../components/Checkbox';
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
}

const UserMailModal: FC<UserMailModalProps> = ({
  isOpen,
  onClose,
  userMail,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [mailUserIsValid, setMailUserIsValid] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      mail_user: '',
      redirect_enabled: true,
    },
    onSubmit: data => console.log(data),
  });
  const createOrUpdateUserMailMutation = useMutation<
    unknown,
    unknown,
    FormProps
  >(async ({ name, mail_user, redirect_enabled }) => {
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
      });

      if (!!userMail) {
        await updateMail(userMail.id, name, redirect_enabled);
      } else {
        await createMail(name, mail_user, redirect_enabled);
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
  });

  useEffect(() => {
    if (!userMail) {
      formik.setValues({ redirect_enabled: true, mail_user: '', name: '' });
      setMailUserIsValid(false);
      return;
    }
    formik.setValues({
      redirect_enabled: userMail.redirect_enabled,
      mail_user: userMail.mail_user,
      name: userMail.name,
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
      size="xl"
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
            value={formik.values.mail_user}
            onChange={formik.handleChange}
            onBlur={handleBlur}
          />

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
