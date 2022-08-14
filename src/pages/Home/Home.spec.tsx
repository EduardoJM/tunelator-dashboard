import { screen, render, waitFor } from '@testing-library/react';
import { wrapper } from '@/mocks/contexts/wrapper';
import Home from './Home';

describe('Home', () => {
  it('should contains an welcome message', () => {
    render(<Home />, { wrapper });

    expect(screen.queryByText(/^home\.title$/i)).toBeInTheDocument();
  });

  it('should contains the latest mail accounts and latest received mails heading', () => {
    render(<Home />, { wrapper });

    expect(screen.queryAllByRole('heading')).toHaveLength(3);
  });

  it('should contains two tables', async () => {
    render(<Home />, { wrapper });

    await waitFor(() => {
      expect(screen.queryAllByTestId('loading-indicator')).toHaveLength(0);
    });

    expect(screen.queryAllByRole('table')).toHaveLength(2);
  });
});
