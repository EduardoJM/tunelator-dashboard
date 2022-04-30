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
  Text,
} from '@chakra-ui/react';
import { RiMailSendLine } from 'react-icons/ri';
import { useSpring, animated, easings } from 'react-spring';
import LoadingIndicatorBox from '../../../components/LoadingIndicatorBox';
import DateTime from '../../../components/DateTime';
import Ellipsis from '../../../components/Ellipsis';
import { getLatestReceivedMails } from '../../../services/mails';
import Button from '../../../components/Button';

const LatestReceivedMails: FC = () => {
  const { data, error, isLoading } = useQuery(
    'latest-received-mails',
    getLatestReceivedMails
  );
  const mailsIconStyle = useSpring({
    loop: true,
    config: {
      duration: 1500,
      easing: easings.easeOutBounce,
    },
    to: { transform: 'translateX(100%)' },
    from: { transform: 'translateX(-100%)' },
  });

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
                      <Flex
                        width="100%"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <animated.div
                          style={{
                            width: 48,
                            height: 48,
                            transformOrigin: 'center bottom',
                            ...mailsIconStyle,
                          }}
                        >
                          <RiMailSendLine size="48px" />
                        </animated.div>
                        <Text mt="20px" fontSize="md" fontWeight="bold">
                          Nenhum e-mail para ser mostrado.
                        </Text>
                      </Flex>
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
        <Button variant="primary">Ver Todas as Informações</Button>
      </Flex>
    </>
  );
};

export default LatestReceivedMails;
