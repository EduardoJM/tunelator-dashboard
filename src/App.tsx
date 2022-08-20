import { FC, Suspense } from 'react';
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

setupTranslations();

export interface AppProps {
  queryClient: QueryClient;
}

const App: FC<AppProps> = ({ queryClient }) => (
  <ChakraProvider theme={theme}>
    <Suspense fallback={<AbsoluteLoadingIndicator />}>
      <LoadingProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <PlanProvider>
                <AppRoutes />
              </PlanProvider>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </LoadingProvider>
    </Suspense>
  </ChakraProvider>
);

export default App;
