import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from '../../contexts/loading';
import { AuthProvider } from '../../contexts/auth';
import Signup from './Signup';

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
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('Signup', () => {
  it('should contains a SignupBox', () => {
    render(<Signup />, { wrapper });

    expect(screen.queryByTestId('signup-box')).toBeInTheDocument();
  });
});
