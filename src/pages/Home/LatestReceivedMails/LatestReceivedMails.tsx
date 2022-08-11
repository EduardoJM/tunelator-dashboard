import { FC } from 'react';
import {
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  LoadingIndicatorBox,
  DateTime,
  Ellipsis,
  NoReceivedMailsBox,
} from '@/components';
import { useLatestReceivedMails } from '@/services/queries';
import { headerBorders } from './styles';

const LatestReceivedMails: FC = () => {
  const { data, isLoading } = useLatestReceivedMails();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleGoToReceivedMails = () => {
    navigate('/received');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Heading as="h2" size="md" mb="40px" fontWeight="bold">
        {t('home.received.title')}
      </Heading>

      {isLoading ? (
        <LoadingIndicatorBox />
      ) : (
        <>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th {...headerBorders}>{t('home.received.from')}</Th>
                  <Th {...headerBorders}>{t('home.received.to')}</Th>
                  <Th {...headerBorders}>{t('home.received.subject')}</Th>
                  <Th {...headerBorders}>{t('home.received.date')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.length === 0 && (
                  <Tr height="220px" backgroundColor="#EEE">
                    <Td colSpan={4} textAlign="center">
                      <NoReceivedMailsBox />
                    </Td>
                  </Tr>
                )}
                {data?.map(receivedMail => (
                  <Tr data-testid="latest-mail-row" key={receivedMail.id}>
                    <Td>
                      <Ellipsis characteres={25}>
                        {receivedMail.origin_mail || t('home.received.unknown')}
                      </Ellipsis>
                    </Td>
                    <Td>
                      <Ellipsis characteres={25}>
                        {receivedMail.mail.mail}
                      </Ellipsis>
                    </Td>
                    <Td>
                      <Ellipsis characteres={40}>
                        {receivedMail.subject || t('home.received.unknown')}
                      </Ellipsis>
                    </Td>
                    <Td>
                      <DateTime value={receivedMail.date} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
      <Flex alignItems="center" justifyContent="end" mt="30px" mb="100px">
        <Button
          variant="primary"
          onClick={handleGoToReceivedMails}
          data-testid="all-button"
        >
          {t('home.received.all')}
        </Button>
      </Flex>
    </>
  );
};

export default LatestReceivedMails;
