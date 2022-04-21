import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AbsoluteLoadingIndicator from './components/AbsoluteLoadingIndicator';
import { AuthProvider } from './contexts/auth';
import { LoadingProvider } from './contexts/loading';
import theme from './theme';
import AppRoutes from './routes';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <BrowserRouter>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Suspense
                fallback={
                  <AbsoluteLoadingIndicator
                    force={true}
                  ></AbsoluteLoadingIndicator>
                }
              >
                <AppRoutes />
              </Suspense>
            </QueryClientProvider>
          </AuthProvider>
        </BrowserRouter>
      </LoadingProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
