import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { LoadingProvider } from '@/contexts/loading';
import { AuthProvider } from '@/contexts/auth';
import { PlanProvider } from '@/contexts/plan';
import { theme } from '@/config';
import { queryClient } from './queryClient';

export const wrapper: FC = ({ children }) => (
  <ChakraProvider theme={theme}>
    <LoadingProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PlanProvider>{children}</PlanProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </LoadingProvider>
  </ChakraProvider>
);
