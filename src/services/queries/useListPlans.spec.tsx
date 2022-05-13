import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import useListPlans from './useListPlans';
import { plans } from '../../mocks/data.json';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const QueryWrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useListPlans', () => {
  it('should return all the plans returned by the API', async () => {
    const { result, waitFor } = renderHook(() => useListPlans(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toHaveLength(plans.length);
  });
});
