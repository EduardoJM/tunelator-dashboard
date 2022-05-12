import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import useListPlans from './useListPlans';

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
  fit('should return all the plans', async () => {
    const { result, waitFor } = renderHook(() => useListPlans(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    console.log(result.current);

    expect(result.current.data).toHaveLength(3);
  });
});
