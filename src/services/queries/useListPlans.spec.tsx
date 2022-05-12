import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import useListPlans from './useListPlans';
import { plans } from '../../mocks/data.json';
import { server } from '../../mocks/server';
import config from '../../config';

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
    server.resetHandlers(
      rest.get(`${config.apiUrl}/api/plans`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(plans));
      })
    );

    const { result, waitFor } = renderHook(() => useListPlans(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toHaveLength(plans.length);
  });
});
