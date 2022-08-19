import { FC } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DateTime, Ellipsis, NoReceivedMailsBox } from '@/components';
import { useLatestReceivedMails } from '@/services/queries';
import { headerBorders } from './styles';

const LatestReceivedMails: FC = () => {
  const { data } = useLatestReceivedMails();
  const { t } = useTranslation();

  return (
    <TableContainer data-testid="latest-received-mails">
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
                <Ellipsis characteres={25}>{receivedMail.mail.mail}</Ellipsis>
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
  );
};

export default LatestReceivedMails;
