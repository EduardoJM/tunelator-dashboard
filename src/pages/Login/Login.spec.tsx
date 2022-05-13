import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from '../../contexts/loading';
import { AuthProvider } from '../../contexts/auth';
import Login from './Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('Login', () => {
  it('should contain an LoginBox', () => {
    render(<Login />, { wrapper: Wrapper });

    const loginBox = screen.queryByTestId('login-box');

    expect(loginBox).toBeInTheDocument();
  });
});
