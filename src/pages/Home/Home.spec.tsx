import { screen, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from '../../contexts/loading';
import Home from './Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

const wrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LoadingProvider>{children}</LoadingProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe('Home', () => {
  it('should contains an welcome message', () => {
    render(<Home />, { wrapper });

    expect(screen.queryByText(/^home\.title$/i)).toBeInTheDocument();
  });

  it('should contains the latest mail accounts and latest received mails heading', () => {
    render(<Home />, { wrapper });

    expect(screen.queryAllByRole('heading')).toHaveLength(3);
  });

  it('should contains two tables', async () => {
    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    expect(screen.queryAllByRole('table')).toHaveLength(2);
  });
});
