import { useQuery } from 'react-query';
import { getMailAccountsPaginated } from '../api/mailAccounts';

const useMailAccountsPaginated = (page: number) => {
  const result = useQuery(['mails', page], () =>
    getMailAccountsPaginated(page)
  );
  return result;
};

export default useMailAccountsPaginated;
