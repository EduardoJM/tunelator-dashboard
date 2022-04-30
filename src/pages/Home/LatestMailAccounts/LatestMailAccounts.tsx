import { FC } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
  FormControl,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Ellipsis from '../../../components/Ellipsis';
import DateTime from '../../../components/DateTime';
import Button from '../../../components/Button';
import NoAccountsBox from '../../../components/NoAccountsBox';
import LoadingIndicatorBox from '../../../components/LoadingIndicatorBox';
import { useLoading } from '../../../contexts/loading';
import { UserMail } from '../../../entities/UserMail';
import {
  getLatestMails,
  setMailRedirectEnabled,
} from '../../../services/mails';
import { getErrorMessages } from '../../../utils/errors';

const LatestMailAccounts: FC = () => {
  const { pushLoading, popLoading } = useLoading();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery('latest-mails', getLatestMails);

  const handleGoToMailsAccountsPage = () => {
    navigate('/mails');
  };

  const handleToggleEnabledStatus = async (mail: UserMail) => {
    pushLoading();
    try {
      await setMailRedirectEnabled(mail.id, !mail.redirect_enabled);
      queryClient.invalidateQueries('latest-mails');
      queryClient.invalidateQueries(['mails']);
    } catch (err) {
      getErrorMessages(err).forEach(error => {
        toast({
          title: error.title,
          description: error.text,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    }
    popLoading();
  };

  const handleCreateAccount = () => {
    navigate('/mails', { state: { openCreateModal: true } });
  };

  return (
    <>
      <Heading as="h2" size="md" mb="40px" fontWeight="bold">
        Minhas contas de e-mail
      </Heading>
      {isLoading ? (
        <LoadingIndicatorBox />
      ) : (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Conta
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  E-mail
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Criado em
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Atualizado em
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Ativo
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.length === 0 && (
                <Tr height="220px" backgroundColor="#EEE">
                  <Td colSpan={5}>
                    <NoAccountsBox
                      createFirstButtonVisible
                      onCreateFirstClick={handleCreateAccount}
                    />
                  </Td>
                </Tr>
              )}
              {data?.map(userMail => (
                <Tr key={userMail.id}>
                  <Td>{userMail.name}</Td>
                  <Td>
                    <Ellipsis characteres={30}>{userMail.mail}</Ellipsis>
                  </Td>
                  <Td>
                    <DateTime value={userMail.created_at} />
                  </Td>
                  <Td>
                    <DateTime value={userMail.updated_at} />
                  </Td>
                  <Td>
                    <FormControl display="flex" alignItems="center">
                      <Switch
                        id="email-alerts"
                        colorScheme="brand"
                        defaultChecked={userMail.redirect_enabled}
                        onChange={() => handleToggleEnabledStatus(userMail)}
                      />
                    </FormControl>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Flex alignItems="center" justifyContent="end" mt="30px" mb="100px">
        <Button variant="primary" onClick={handleGoToMailsAccountsPage}>
          Ver Tudo
        </Button>
      </Flex>
    </>
  );
};

export default LatestMailAccounts;
