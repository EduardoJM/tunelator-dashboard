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
  Flex,
} from '@chakra-ui/react';
import LoadingIndicatorBox from '../LoadingIndicatorBox';
import DateTime from '../DateTime';
import Ellipsis from '../Ellipsis';
import { getLatestReceivedMails } from '../../services/mails';
import Button from '../Button';

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
                </Tr>
              </Thead>
              <Tbody>
                {data?.map(receivedMail => (
                  <Tr key={receivedMail.id}>
                    <Td>
                      <Ellipsis characteres={25}>
                        {receivedMail.origin_mail || 'Desconhecido'}
                      </Ellipsis>
                    </Td>
                    <Td>
                      <Ellipsis characteres={25}>
                        {receivedMail.mail.mail}
                      </Ellipsis>
                    </Td>
                    <Td>
                      <Ellipsis characteres={40}>
                        {receivedMail.subject || 'Desconhecido'}
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
        <Button variant="primary">Ver Todas as Informações</Button>
      </Flex>
    </>
  );
};

export default LatestReceivedMails;
