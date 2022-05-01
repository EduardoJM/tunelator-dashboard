import { FC, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import Button from '../../components/Common/Button';

export interface ResendMailSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResendMailSuccessModal: FC<ResendMailSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<any>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Reenvio de E-mail
          </AlertDialogHeader>

          <AlertDialogBody>
            Em alguns segundos seu e-mail será enviado novamente. Como apenas
            fazemos o redirecionamento de e-mails, por favor, verifique sua
            Caixa de Spam também.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="ghost" ref={cancelRef} onClick={onClose}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ResendMailSuccessModal;
