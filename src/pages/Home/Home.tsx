import { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LatestMailAccounts from './LatestMailAccounts';
import LatestReceivedMails from './LatestReceivedMails';

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading as="h1" size="xl" my="50px" fontWeight="bold">
        {t('home.title')}
      </Heading>
      <LatestMailAccounts />
      <LatestReceivedMails />
    </>
  );
};

export default Home;
