import { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import RecoveryPassword from './RecoveryPassword';
import { LoadingProvider } from '../../contexts/loading';

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
      <BrowserRouter>{children}</BrowserRouter>
    </LoadingProvider>
  </QueryClientProvider>
);

describe('RecoveryPassword', () => {
  it('should contains an form, an e-mail input and a submit button', () => {});
});
