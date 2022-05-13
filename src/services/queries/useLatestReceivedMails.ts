import { useQuery } from 'react-query';
import { getLatestReceivedMails } from '../api/receivedMails';

const useLatestReceivedMails = () =>
  useQuery('latest-received-mails', getLatestReceivedMails);

export default useLatestReceivedMails;
