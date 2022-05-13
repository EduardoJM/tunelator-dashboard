import { screen, render } from '@testing-library/react';
import PriceInCents from './PriceInCents';

describe('PriceInCents', () => {
  it('should be show the correctly value with four places', () => {
    render(<PriceInCents value={6900} />);

    const price = screen.queryByText(/^R\$ 69,00$/i);

    expect(price).toBeInTheDocument();
  });

  it('should be show the correctly value with seven places', () => {
    render(<PriceInCents value={6900054} />);

    const price = screen.queryByText(/^R\$ 69.000,54$/i);

    expect(price).toBeInTheDocument();
  });

  it('should be show the corrctly value with two places', () => {
    render(<PriceInCents value={45} />);

    const price = screen.queryByText(/^R\$ 0,45$/i);

    expect(price).toBeInTheDocument();
  });

  it('should be show the corrctly value with one places', () => {
    render(<PriceInCents value={4} />);

    const price = screen.queryByText(/^R\$ 0,04$/i);

    expect(price).toBeInTheDocument();
  });

  it('should be show the corrctly value with zero as value', () => {
    render(<PriceInCents value={0} />);

    const price = screen.queryByText(/^R\$ 0,00$/i);

    expect(price).toBeInTheDocument();
  });
});
