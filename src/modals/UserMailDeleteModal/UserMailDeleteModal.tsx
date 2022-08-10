import { FC, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Common/Button';

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
  const { t } = useTranslation();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            data-testid="modal-title"
          >
            {t('modals.deleteaccount.title')}
          </AlertDialogHeader>

          <AlertDialogBody>{t('modals.deleteaccount.body')}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="ghost"
              ref={cancelRef}
              onClick={onCancel}
              data-testid="cancel-button"
            >
              {t('modals.cancel')}
            </Button>
            <Button
              variant="destroy"
              onClick={onConfirm}
              ml={3}
              data-testid="confirm-button"
            >
              {t('modals.deleteaccount.delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default UserMailDeleteModal;
