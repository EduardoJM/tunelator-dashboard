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
import { useNavigate } from 'react-router-dom';
import LoadingIndicatorBox from '../../../components/Placeholders/LoadingIndicatorBox';
import { DateTime, Ellipsis } from '../../../components';
import { getLatestReceivedMails } from '../../../services/receivedMails';
import Button from '../../../components/Common/Button';
import NoReceivedMailsBox from '../../../components/Placeholders/NoReceivedMailsBox';

const LatestReceivedMails: FC = () => {
  const { data, error, isLoading } = useQuery(
    'latest-received-mails',
    getLatestReceivedMails
  );

  const navigate = useNavigate();

  const handleGoToReceivedMails = () => {
    navigate('/received');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                {data?.length === 0 && (
                  <Tr height="220px" backgroundColor="#EEE">
                    <Td colSpan={4} textAlign="center">
                      <NoReceivedMailsBox />
                    </Td>
                  </Tr>
                )}
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
        <Button variant="primary" onClick={handleGoToReceivedMails}>
          Ver Todas as Informações
        </Button>
      </Flex>
    </>
  );
};

export default LatestReceivedMails;
