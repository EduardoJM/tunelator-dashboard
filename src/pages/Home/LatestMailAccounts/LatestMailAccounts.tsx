import { FC } from 'react';
import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  FormControl,
  Switch,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DateTime, Ellipsis } from '@/components/ValueFormat';
import { NoAccountsBox } from '@/components/Placeholders';
import { UserMail } from '@/entities/UserMail';
import { useSetMailAccountRedirectEnabledMutation } from '@/services/mutations';
import { useLatestMailAccounts } from '@/services/queries';
import { headerBorders } from './styles';

const LatestMailAccounts: FC = () => {
  const navigate = useNavigate();
  const { data } = useLatestMailAccounts();
  const { t } = useTranslation();

  const setMailAccountRedirectEnabledMutation =
    useSetMailAccountRedirectEnabledMutation();

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
    <TableContainer data-testid="latest-mail-accounts">
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
  );
};

export default LatestMailAccounts;
