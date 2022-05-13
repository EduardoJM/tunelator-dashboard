import { FC } from 'react';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DateTime, Ellipsis } from '../../../components';
import Button from '../../../components/Common/Button';
import NoAccountsBox from '../../../components/Placeholders/NoAccountsBox';
import LoadingIndicatorBox from '../../../components/Placeholders/LoadingIndicatorBox';
import { UserMail } from '../../../entities/UserMail';
import { useSetMailAccountRedirectEnabledMutation } from '../../../services/mutations';
import { useLatestMailAccounts } from '../../../services/queries';

const LatestMailAccounts: FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useLatestMailAccounts();

  const setMailAccountRedirectEnabledMutation =
    useSetMailAccountRedirectEnabledMutation();

  const handleGoToMailsAccountsPage = () => {
    navigate('/mails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleEnabledStatus = (mail: UserMail) => {
    setMailAccountRedirectEnabledMutation.mutate({
      id: mail.id,
      enabled: !mail.redirect_enabled,
    });
  };

  const handleCreateAccount = () => {
    navigate('/mails', { state: { openCreateModal: true } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <Tr data-testid="latest-accounts-row" key={userMail.id}>
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
