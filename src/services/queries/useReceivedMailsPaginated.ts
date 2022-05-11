import { useQuery } from 'react-query';
import { getReceivedMailsPaginated } from '../api/receivedMails';

const useReceivedMailsPaginated = (page: number) => {
  const result = useQuery(['received-mails', page], () =>
    getReceivedMailsPaginated(page)
  );
  return result;
};

export default useReceivedMailsPaginated;
