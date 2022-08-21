import { FC, Suspense } from 'react';
import { Alert, AlertIcon, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TableSkeleton } from '@/components/Skeletons';
import ReceivedMailsTable from './ReceivedMailsTable';

const ReceivedMails: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading as="h1" size="lg" my="50px" fontWeight="bold">
        {t('receivedMails.title')}
      </Heading>

      <Alert status="info" variant="top-accent" mb="50px">
        <AlertIcon />
        {t('receivedMails.alert')}
      </Alert>

      <Suspense fallback={<TableSkeleton />}>
        <ReceivedMailsTable />
      </Suspense>
    </>
  );
};

export default ReceivedMails;
