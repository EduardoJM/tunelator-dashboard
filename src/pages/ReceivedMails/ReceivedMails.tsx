import { FC, Fragment, useMemo, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Container,
  Box,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Collapse,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Dashboard from '../../layouts/Dashboard';
import { getReceivedMailsPaginated } from '../../services/receivedMails';
import {
  Button,
  DateTime,
  Ellipsis,
  LoadingIndicatorBox,
  NoReceivedMailsBox,
} from '../../components';

const ReceivedMails: FC = () => {
  const { pageNumber } = useParams();

  const currentPage = useMemo(() => {
    if (!pageNumber) {
      return 1;
    }
    const num = parseInt(pageNumber, 10);
    if (Number.isNaN(num)) {
      return 1;
    }
    return num;
  }, [pageNumber]);

  const { data, error, isLoading } = useQuery(
    ['received-mails', currentPage],
    () => getReceivedMailsPaginated(currentPage)
  );

  const [expanded, setExpanded] = useState<null | number>(null);

  const handleExpandItem = (id: number) => {
    if (id === expanded) {
      return setExpanded(null);
    }
    setExpanded(id);
  };

  return (
    <Dashboard>
      <Container maxW="120ch">
        <Heading as="h1" size="lg" my="50px" fontWeight="bold">
          E-mails Recebidos
        </Heading>

        <Alert status="info" variant="top-accent" mb="50px">
          <AlertIcon />
          Mantemos um histórico dos e-mails recebidos nos últimos 30 dias. Nessa
          página você consegue visualizar o histórico de redirecionamentos e
          executar algumas ações, como, por exemplo, reenviar algum dos e-mails.
        </Alert>

        {isLoading ? (
          <LoadingIndicatorBox />
        ) : (
          <TableContainer mb="100px">
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
                  />
                </Tr>
              </Thead>
              <Tbody>
                {data?.results.length === 0 && (
                  <Tr height="220px" backgroundColor="#EEE">
                    <Td colSpan={4} textAlign="center">
                      <NoReceivedMailsBox />
                    </Td>
                  </Tr>
                )}
                {data?.results.map(receivedMail => (
                  <Fragment key={receivedMail.id}>
                    <Tr>
                      <Td border="none">
                        <Ellipsis characteres={22}>
                          {receivedMail.origin_mail || 'Desconhecido'}
                        </Ellipsis>
                      </Td>
                      <Td border="none">
                        <Ellipsis characteres={22}>
                          {receivedMail.mail.mail}
                        </Ellipsis>
                      </Td>
                      <Td border="none">
                        <Ellipsis characteres={30}>
                          {receivedMail.subject || 'Desconhecido'}
                        </Ellipsis>
                      </Td>
                      <Td border="none">
                        <DateTime value={receivedMail.date} />
                      </Td>
                      <Td border="none">
                        <Button
                          variant="fullGhost"
                          p="2px"
                          onClick={() => handleExpandItem(receivedMail.id)}
                        >
                          {receivedMail.id === expanded ? (
                            <MdArrowDropUp size="16px" />
                          ) : (
                            <MdArrowDropDown size="16px" />
                          )}
                        </Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colSpan={5} p="0" bgColor="#EFEFEF">
                        <Collapse
                          in={receivedMail.id === expanded}
                          animateOpacity
                        >
                          <Box p="4">
                            <VStack width="100%">
                              <Box width="100%">
                                <Text as="span" fontWeight="bold">
                                  Assunto:{' '}
                                </Text>
                                <Text as="span">{receivedMail.subject}</Text>
                              </Box>
                              <Box width="100%">
                                <Text as="span" fontWeight="bold">
                                  Enviado De:{' '}
                                </Text>
                                <Text as="span">
                                  {receivedMail.origin_mail}
                                </Text>
                              </Box>
                              <Box width="100%">
                                <Text as="span" fontWeight="bold">
                                  Enviado Para:{' '}
                                </Text>
                                <Text as="span">{receivedMail.mail.mail}</Text>
                              </Box>
                              {receivedMail.delivered ? (
                                <>
                                  <Box width="100%">
                                    <Text as="span" fontWeight="bold">
                                      Reenviado:{' '}
                                    </Text>
                                    <Text as="span">Sim</Text>
                                  </Box>
                                  {receivedMail.delivered_date && (
                                    <Box width="100%">
                                      <Text as="span" fontWeight="bold">
                                        Data do Último Reenvio:{' '}
                                      </Text>
                                      <Text as="span">
                                        <DateTime
                                          value={receivedMail.delivered_date}
                                        />
                                      </Text>
                                    </Box>
                                  )}
                                </>
                              ) : (
                                <Box width="100%">
                                  <Text as="span" fontWeight="bold">
                                    Reenviado:{' '}
                                  </Text>
                                  <Text as="span">Não</Text>
                                </Box>
                              )}
                              <Flex
                                pt="20px"
                                width="100%"
                                alignItems="center"
                                justifyContent="flex-end"
                              >
                                <Button variant="primaryRounded">
                                  Reenviar
                                </Button>
                              </Flex>
                            </VStack>
                          </Box>
                        </Collapse>
                      </Td>
                    </Tr>
                  </Fragment>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Dashboard>
  );
};

export default ReceivedMails;
