import { FC, Fragment, useMemo, useState } from 'react';
import {
  Alert,
  AlertIcon,
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
  useDisclosure,
} from '@chakra-ui/react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import {
  Button,
  DateTime,
  Ellipsis,
  LoadingIndicatorBox,
  NoReceivedMailsBox,
  Pagination,
} from '../../components';
import { ResendMailSuccessModal } from '../../modals';
import { useReceivedMailsPaginated } from '../../services/queries';
import { useResendReceivedMailMutation } from '../../services/mutations';

const ReceivedMails: FC = () => {
  const { userData } = useAuth();

  const navigate = useNavigate();

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

  const { data, error, isLoading } = useReceivedMailsPaginated(currentPage);

  const resendModal = useDisclosure();

  const resendReceivedMailMutation = useResendReceivedMailMutation(
    resendModal.onOpen
  );

  const [expanded, setExpanded] = useState<null | number>(null);

  const handleExpandItem = (id: number) => {
    if (id === expanded) {
      return setExpanded(null);
    }
    setExpanded(id);
  };

  const handleResendMail = (id: number) =>
    resendReceivedMailMutation.mutate({ id });

  const handleGoToPage = (page: number) => {
    navigate(`/received/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
        <TableContainer mb="50px">
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
                  <Td colSpan={5} textAlign="center">
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
                    <Td colSpan={5} p="0" bgColor="#EFEFEF" borderRadius="5px">
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
                              <Text as="span">{receivedMail.origin_mail}</Text>
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
                                <Box width="100%">
                                  <Text as="span" fontWeight="bold">
                                    Reenviado Para:{' '}
                                  </Text>
                                  {!!receivedMail.mail.redirect_to ? (
                                    <Text as="span">
                                      {receivedMail.mail.redirect_to}
                                    </Text>
                                  ) : (
                                    <Text as="span">
                                      {userData?.email || '-'}
                                    </Text>
                                  )}
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
                              <Button
                                variant="primaryRounded"
                                onClick={() =>
                                  handleResendMail(receivedMail.id)
                                }
                              >
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

      <Pagination
        totalCount={data?.count || 0}
        itemsPerPage={10}
        currentPage={currentPage}
        onGoToPage={handleGoToPage}
      />

      <ResendMailSuccessModal
        isOpen={resendModal.isOpen}
        onClose={resendModal.onClose}
      />
    </>
  );
};

export default ReceivedMails;
