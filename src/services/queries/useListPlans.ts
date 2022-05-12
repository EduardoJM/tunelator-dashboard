import { useQuery } from 'react-query';
import { listPlans } from '../api/plans';

const useListPlans = () => useQuery('plans', listPlans);

export default useListPlans;
