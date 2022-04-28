import { FC, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import Button from '../../components/Button';

export interface UserMailDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const UserMailDeleteModal: FC<UserMailDeleteModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const cancelRef = useRef<any>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Conta de E-mail
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja deletar essa conta de e-mail? Você não poderá
            desfazer essa ação.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="ghost" ref={cancelRef} onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="destroy" onClick={onConfirm} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default UserMailDeleteModal;
