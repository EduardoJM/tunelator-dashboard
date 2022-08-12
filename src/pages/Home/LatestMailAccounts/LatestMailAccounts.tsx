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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  DateTime,
  Ellipsis,
  Button,
  NoAccountsBox,
  LoadingIndicatorBox,
} from '@/components';
import { UserMail } from '@/entities/UserMail';
import { useSetMailAccountRedirectEnabledMutation } from '@/services/mutations';
import { useLatestMailAccounts } from '@/services/queries';
import { headerBorders } from './styles';

const LatestMailAccounts: FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useLatestMailAccounts();
  const { t } = useTranslation();

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
        {t('home.accounts.title')}
      </Heading>
      {isLoading ? (
        <LoadingIndicatorBox />
      ) : (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th {...headerBorders}>{t('home.accounts.account')}</Th>
                <Th {...headerBorders}>{t('home.accounts.email')}</Th>
                <Th {...headerBorders}>{t('home.accounts.created')}</Th>
                <Th {...headerBorders}>{t('home.accounts.updated')}</Th>
                <Th {...headerBorders}>{t('home.accounts.enabled')}</Th>
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
        <Button
          variant="primary"
          onClick={handleGoToMailsAccountsPage}
          data-testid="all-button"
        >
          {t('home.accounts.all')}
        </Button>
      </Flex>
    </>
  );
};

export default LatestMailAccounts;
