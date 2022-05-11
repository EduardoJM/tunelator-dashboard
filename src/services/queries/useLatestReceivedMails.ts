import { useQuery } from 'react-query';
import { getLatestReceivedMails } from '../api/receivedMails';

const useLatestReceivedMails = () => {
  const result = useQuery('latest-received-mails', getLatestReceivedMails);
  return result;
};

export default useLatestReceivedMails;
