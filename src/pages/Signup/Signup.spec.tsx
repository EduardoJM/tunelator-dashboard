import { render, screen, act, waitFor } from '@testing-library/react';
import { wrapper } from '@/mocks/contexts/wrapper';
import Signup from './Signup';

describe('Signup', () => {
  it('should contains a SignupBox', () => {
    render(<Signup />, { wrapper });

    expect(screen.queryByTestId('signup-box')).toBeInTheDocument();
  });
});
