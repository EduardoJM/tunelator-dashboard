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

export interface TermsOfUseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const TermsOfUseModal: FC<TermsOfUseModalProps> = ({
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
            Termos de Uso
          </AlertDialogHeader>

          <AlertDialogBody>ALOAHHHHHH</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="ghost"
              ref={cancelRef}
              onClick={onCancel}
              data-testid="cancel-button"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              ml={3}
              data-testid="confirm-button"
            >
              Aceitar os Termos
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default TermsOfUseModal;
