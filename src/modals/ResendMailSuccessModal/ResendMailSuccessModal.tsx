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

export interface ResendMailSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResendMailSuccessModal: FC<ResendMailSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<any>(null);
  const { t } = useTranslation();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            data-testid="dialog-title"
          >
            {t('modals.resend.title')}
          </AlertDialogHeader>

          <AlertDialogBody>{t('modals.resend.body')}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="ghost"
              ref={cancelRef}
              onClick={onClose}
              data-testid="close-button"
            >
              {t('modals.close')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ResendMailSuccessModal;
