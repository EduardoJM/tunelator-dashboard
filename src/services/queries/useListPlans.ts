import { useQuery } from 'react-query';
import { listPlans } from '../api/plans';

const useListPlans = () => {
  const result = useQuery('plans', listPlans);
  return result;
};

export default useListPlans;
