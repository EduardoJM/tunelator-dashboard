import { useMutation } from 'react-query';
import { createSession, goToCheckout } from '../api/payments';
import { useLoading } from '../../contexts/loading';

interface GoToCheckoutMutationProps {
  id: number;
}

const useGoToCheckoutMutation = () => {
  const { pushLoading } = useLoading();

  return useMutation<unknown, unknown, GoToCheckoutMutationProps>(
    async ({ id }) => {
      pushLoading();
      const session = await createSession(id);
      goToCheckout(session);
    }
  );
};

export default useGoToCheckoutMutation;
