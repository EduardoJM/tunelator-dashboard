import { useQuery } from 'react-query';
import { getLatestMailAccounts } from '../api/mailAccounts';

const useLatestMailAccounts = () => {
  const result = useQuery('latest-mails', getLatestMailAccounts);
  return result;
};

export default useLatestMailAccounts;
