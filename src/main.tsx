import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/auth';
import { LoadingProvider } from './contexts/loading';
import theme from './theme';
import AppRoutes from './routes';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<></>}>
                <AppRoutes />
              </Suspense>
            </QueryClientProvider>
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
