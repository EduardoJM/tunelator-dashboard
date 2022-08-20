import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/auth';
import { LoadingProvider } from '@/contexts/loading';

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

describe('contexts/auth', () => {
  it('should be recognize if the refresh token is set into the localStorage and login at mount', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.userData).not.toBeNull();
      expect(result.current.loggedIn).toEqual(true);
    });
  });

  it('should be recognize if the refresh token is set into the sessionStorage and login at mount', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.userData).not.toBeNull();
      expect(result.current.loggedIn).toEqual(true);
    });
  });

  it('should be the logout remove the refresh token from localStorage and sessionStorage and remove userData and loggedIn to false', async () => {
    window.sessionStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.userData).not.toBeNull();
    });

    act(() => {
      result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.userData).toBeNull();
      expect(result.current.loggedIn).toEqual(false);
      expect(window.sessionStorage.getItem('@TUNELATOR_REFRESH')).toBeNull();
      expect(window.localStorage.getItem('@TUNELATOR_REFRESH')).toBeNull();
    });
  });
});
