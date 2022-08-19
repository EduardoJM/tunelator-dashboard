import { Fragment, useMemo, useState } from 'react';
import {
  TableContainer,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Collapse,
  VStack,
  Box,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  NoReceivedMailsBox,
  Ellipsis,
  DateTime,
  Pagination,
} from '@/components';
import { useResendReceivedMailMutation } from '@/services/mutations';
import { useReceivedMailsPaginated } from '@/services/queries';
import { useAuth } from '@/contexts/auth';
import { ResendMailSuccessModal } from '@/modals';
import { headerBorders } from './styles';

const ReceivedMailsTable = () => {
  const { t } = useTranslation();
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
  const { data } = useReceivedMailsPaginated(currentPage);

  const [expanded, setExpanded] = useState<null | number>(null);

  const handleExpandItem = (id: number) => {
    if (id === expanded) {
      return setExpanded(null);
    }
    setExpanded(id);
  };

  const resendModal = useDisclosure();
  const resendReceivedMailMutation = useResendReceivedMailMutation(
    resendModal.onOpen
  );

  const handleResendMail = (id: number) =>
    resendReceivedMailMutation.mutate({ id });

  const handleGoToPage = (page: number) => {
    navigate(`/received/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <TableContainer mb="50px">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th {...headerBorders}>{t('receivedMails.from')}</Th>
              <Th {...headerBorders}>{t('receivedMails.to')}</Th>
              <Th {...headerBorders}>{t('receivedMails.subject')}</Th>
              <Th {...headerBorders}>{t('receivedMails.date')}</Th>
              <Th {...headerBorders} />
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
                      {receivedMail.origin_mail || t('receivedMails.unknown')}
                    </Ellipsis>
                  </Td>
                  <Td border="none">
                    <Ellipsis characteres={22}>
                      {receivedMail.mail.mail}
                    </Ellipsis>
                  </Td>
                  <Td border="none">
                    <Ellipsis characteres={30}>
                      {receivedMail.subject || t('receivedMails.unknown')}
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
                    <Collapse in={receivedMail.id === expanded} animateOpacity>
                      <Box p="4">
                        <VStack width="100%">
                          <Box width="100%">
                            <Text as="span" fontWeight="bold">
                              {t('receivedMails.subjectLabel')}
                            </Text>
                            <Text as="span">{receivedMail.subject}</Text>
                          </Box>
                          <Box width="100%">
                            <Text as="span" fontWeight="bold">
                              {t('receivedMails.fromLabel')}
                            </Text>
                            <Text as="span">{receivedMail.origin_mail}</Text>
                          </Box>
                          <Box width="100%">
                            <Text as="span" fontWeight="bold">
                              {t('receivedMails.toLabel')}
                            </Text>
                            <Text as="span">{receivedMail.mail.mail}</Text>
                          </Box>
                          {receivedMail.delivered ? (
                            <>
                              <Box width="100%">
                                <Text as="span" fontWeight="bold">
                                  {t('receivedMails.deliveredLabel')}
                                </Text>
                                <Text as="span">
                                  {t('receivedMails.yesDelivered')}
                                </Text>
                              </Box>
                              <Box width="100%">
                                <Text as="span" fontWeight="bold">
                                  {t('receivedMails.deliveredToLabel')}
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
                                    {t('receivedMails.deliveredDateLabel')}
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
                                {t('receivedMails.deliveredLabel')}
                              </Text>
                              <Text as="span">
                                {t('receivedMails.noDelivered')}
                              </Text>
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
                              onClick={() => handleResendMail(receivedMail.id)}
                            >
                              {t('receivedMails.resend')}
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

export default ReceivedMailsTable;
