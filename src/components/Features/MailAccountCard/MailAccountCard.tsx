import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  VStack,
  Heading,
  Divider,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as CSS from 'csstype';
import { DateTime } from '@/components/ValueFormat';
import { Button } from '@/components/Common';
import { WaitMailAccountDone } from '@/components/Features';
import { UserMail } from '@/entities/UserMail';
import { usePlan } from '@/contexts/plan';

export interface MailAccountCardProps {
  userMail: UserMail;
  onRefreshPageAndLatest: () => void;
  onToggleEnabledStatus: (account: UserMail) => void;
  onDelete: (account: UserMail) => void;
  onEdit: (account: UserMail) => void;
}

const MailAccountCard: FC<MailAccountCardProps> = ({
  userMail,
  onRefreshPageAndLatest,
  onToggleEnabledStatus,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();
  const { plan } = usePlan();
  const accountCardActionsDirection =
    useBreakpointValue<CSS.Property.FlexDirection>({
      base: 'column',
      md: 'row',
    });

  const accountCardActionsAlign = useBreakpointValue<CSS.Property.AlignItems>({
    base: 'stretch',
    md: 'center',
  });

  const handleEdit = () => onEdit(userMail);
  const handleDelete = () => onDelete(userMail);
  const handleToggleStatus = () => onToggleEnabledStatus(userMail);

  return (
    <Box
      data-testid="mail-account-card"
      width="100%"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="5px"
      p="20px"
      mb="20px"
      _hover={{ backgroundColor: 'gray.50' }}
    >
      <VStack width="100%">
        <Heading width="100%" as="h2" size="md" fontWeight="bold">
          {userMail.name}
        </Heading>
        {!!userMail.mail ? (
          <Box width="100%">
            <Text mb="10px">{userMail.mail}</Text>
          </Box>
        ) : (
          <Box width="100%">
            <WaitMailAccountDone
              accountId={userMail.id}
              onAccountIsDone={onRefreshPageAndLatest}
            />
          </Box>
        )}
        <Divider />
        <Box width="100%">
          <Text fontWeight="bold">{t('mailAccounts.createdAtLabel')}</Text>
          <DateTime value={userMail.created_at} />
        </Box>
        <Divider />
        <Box width="100%">
          <Text fontWeight="bold">{t('mailAccounts.updatedAtLabel')}</Text>
          <DateTime value={userMail.updated_at} />
        </Box>
        <Divider />
        <Flex
          width="100%"
          flexDirection={accountCardActionsDirection}
          alignItems={accountCardActionsAlign}
          justifyContent="space-between"
          py="5px"
          gap="10px"
        >
          <FormControl flex="1" display="flex" alignItems="center">
            <FormLabel htmlFor={`email-${userMail.id}-enabled`} mb="0">
              {t('mailAccounts.enabled')}
            </FormLabel>
            <Switch
              id={`email-${userMail.id}-enabled`}
              colorScheme="brand"
              defaultChecked={userMail.redirect_enabled}
              onChange={handleToggleStatus}
            />
          </FormControl>

          {plan?.canDeleteUserMail(userMail) ? (
            <Button onClick={handleDelete} variant="destroy">
              {t('mailAccounts.delete')}
            </Button>
          ) : (
            <Tooltip
              hasArrow
              label={t('mailAccounts.noDeletePermission', {
                days: plan?.days_until_user_can_delete_account,
              })}
              bg="brand.100"
              color="white"
              shouldWrapChildren
            >
              <Button w="100%" variant="destroy" mr="10px" isDisabled={true}>
                {t('mailAccounts.delete')}
              </Button>
            </Tooltip>
          )}

          <Button variant="primary" onClick={handleEdit}>
            {t('mailAccounts.edit')}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default MailAccountCard;
