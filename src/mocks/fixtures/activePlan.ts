import factory from '../factories/plan';

const activePlan = {
  ...factory(),
  free_accounts: 5,
  configs: [
    {
      name: 'mails',
      value: 4,
    },
    {
      name: 'allow_custom_redirect',
      value: true,
    },
    {
      name: 'allow_resend_mails',
      value: true,
    },
    {
      name: 'days_until_user_can_delete_account',
      value: 2,
    },
  ],
};

export default activePlan;
