import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setupTranslations } from './translations';
import AbsoluteLoadingIndicator from './components/Placeholders/AbsoluteLoadingIndicator';
import { AuthProvider } from './contexts/auth';
import { LoadingProvider } from './contexts/loading';
import { PlanProvider } from './contexts/plan';
import { theme } from './config';
import AppRoutes from './routes';

const queryClient = new QueryClient();

setupTranslations();

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <LoadingProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PlanProvider>
              <Suspense fallback={<AbsoluteLoadingIndicator />}>
                <AppRoutes />
              </Suspense>
            </PlanProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </LoadingProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
