import { render, screen } from '@testing-library/react';
import { wrapper } from '@/mocks/contexts/wrapper';
import Login from './Login';

describe('Login', () => {
  it('should contain an LoginBox', () => {
    render(<Login />, { wrapper });

    const loginBox = screen.queryByTestId('login-box');

    expect(loginBox).toBeInTheDocument();
  });
});
