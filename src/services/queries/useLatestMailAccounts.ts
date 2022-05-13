import { useQuery } from 'react-query';
import { getLatestMailAccounts } from '../api/mailAccounts';

const useLatestMailAccounts = () =>
  useQuery('latest-mails', getLatestMailAccounts);

export default useLatestMailAccounts;
