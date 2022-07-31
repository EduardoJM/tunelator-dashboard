import { Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { wrapper } from '@/mocks/contexts/wrapper';
import { mockOnce } from '@/mocks/server';
import { waitAbsoluteLoader } from '@/test/utils/loaders';
import RequireAuth from './RequireAuth';

const Component = () => (
  <Routes>
    <Route path="/any-route" element={<RequireAuth>testing</RequireAuth>} />
    <Route path="/auth" element={<>auth</>} />
  </Routes>
);

describe('RequireAuth', () => {
  it('should render the children component if the user is authenticated', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem('@TUNELATOR_REFRESH', 'TOKEN');

    window.history.replaceState({}, '', '/any-route');

    render(<Component />, { wrapper });

    await waitAbsoluteLoader();
    await waitFor(() => {
      expect(screen.queryByText(/^testing$/)).toBeInTheDocument();
    });

    expect(window.location.pathname).toEqual('/any-route');

    window.sessionStorage.clear();
  });

  it('should redirect to /auth route if the user is not authenticated', async () => {
    window.localStorage.clear();
    window.sessionStorage.clear();

    window.history.replaceState({}, '', '/any-route');

    render(<Component />, { wrapper });

    await waitAbsoluteLoader();
    await waitFor(() => {
      expect(screen.queryByText(/^testing$/)).not.toBeInTheDocument();
    });

    expect(window.location.pathname).toEqual('/auth');
  });
});
