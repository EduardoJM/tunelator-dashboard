import { useMutation } from 'react-query';
import {
  createCustomerPortalSession,
  goToCustomerPortal,
} from '../api/payments';
import { useLoading } from '../../contexts/loading';

const useGoToCustomerPortalMutation = () => {
  const { pushLoading } = useLoading();

  return useMutation(async () => {
    pushLoading();
    const session = await createCustomerPortalSession();
    goToCustomerPortal(session);
  });
};

export default useGoToCustomerPortalMutation;
