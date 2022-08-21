import { Suspense } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Common';
import { TableSkeleton } from '@/components/Skeletons';
import {
  MailAccountsBoundary,
  ReceivedMailsBoundary,
} from '@/components/ErrorBoundaries';
import LatestMailAccounts from './LatestMailAccounts';
import LatestReceivedMails from './LatestReceivedMails';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoToMailsAccountsPage = () => {
    navigate('/mails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToReceivedMails = () => {
    navigate('/received');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Heading as="h1" size="xl" my="50px" fontWeight="bold">
        {t('home.title')}
      </Heading>
      <Heading as="h2" size="md" mb="40px" fontWeight="bold">
        {t('home.accounts.title')}
      </Heading>
      <Suspense fallback={<TableSkeleton />}>
        <MailAccountsBoundary>
          <LatestMailAccounts />
        </MailAccountsBoundary>
      </Suspense>
      <Flex alignItems="center" justifyContent="end" mt="30px" mb="100px">
        <Button
          variant="primary"
          onClick={handleGoToMailsAccountsPage}
          data-testid="all-accounts-button"
        >
          {t('home.accounts.all')}
        </Button>
      </Flex>
      <Heading as="h2" size="md" mb="40px" fontWeight="bold">
        {t('home.received.title')}
      </Heading>
      <Suspense fallback={<TableSkeleton />}>
        <ReceivedMailsBoundary>
          <LatestReceivedMails />
        </ReceivedMailsBoundary>
      </Suspense>
      <Flex alignItems="center" justifyContent="end" mt="30px" mb="100px">
        <Button
          variant="primary"
          onClick={handleGoToReceivedMails}
          data-testid="all-received-button"
        >
          {t('home.received.all')}
        </Button>
      </Flex>
    </>
  );
};

export default Home;
