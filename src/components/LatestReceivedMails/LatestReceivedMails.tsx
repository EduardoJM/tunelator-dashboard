import { FC } from 'react';
import { useQuery } from 'react-query';
import {
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
} from '@chakra-ui/react';
import LoadingIndicatorBox from '../LoadingIndicatorBox';
import { getLatestReceivedMails } from '../../services/mails';
import DateTime from '../DateTime';

const LatestReceivedMails: FC = () => {
  const { data, error, isLoading } = useQuery(
    'latest-received-mails',
    getLatestReceivedMails
  );

  return (
    <>
      <Heading as="h2" size="md" mb="40px" fontWeight="bold">
        Últimos e-mails recebidos
      </Heading>

      {isLoading ? (
        <LoadingIndicatorBox />
      ) : (
        <>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th
                    borderColor="brand.500"
                    borderBottomWidth="2px"
                    bgColor="gray.100"
                  >
                    De
                  </Th>
                  <Th
                    borderColor="brand.500"
                    borderBottomWidth="2px"
                    bgColor="gray.100"
                  >
                    Para
                  </Th>
                  <Th
                    borderColor="brand.500"
                    borderBottomWidth="2px"
                    bgColor="gray.100"
                  >
                    Assunto
                  </Th>
                  <Th
                    borderColor="brand.500"
                    borderBottomWidth="2px"
                    bgColor="gray.100"
                  >
                    Data
                  </Th>
                  <Th
                    borderColor="brand.500"
                    borderBottomWidth="2px"
                    bgColor="gray.100"
                  >
                    Encaminhado?
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map(receivedMail => (
                  <Tr key={receivedMail.id}>
                    <Td>{receivedMail.origin_mail || 'Desconhecido'}</Td>
                    <Td>{'receivedMail.mail'}</Td>
                    <Td>{receivedMail.subject || 'Desconhecido'}</Td>
                    <Td>
                      <DateTime value={receivedMail.date} />
                    </Td>
                    <Td>{receivedMail.delivered ? 'Sim' : 'Não'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default LatestReceivedMails;
