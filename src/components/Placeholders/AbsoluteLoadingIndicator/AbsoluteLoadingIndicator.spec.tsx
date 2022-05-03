import { screen, render } from '@testing-library/react';
import AbsoluteLoadingIndicator from './AbsoluteLoadingIndicator';

describe('AbsoluteLoadingIndicator', () => {
  it('must render a fixed positioned screen', () => {
    render(<AbsoluteLoadingIndicator />);

    const overlay = screen.queryByTestId('absolute-loading-overlay');

    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('position: fixed');
  });

  it('must render a svg', () => {
    render(<AbsoluteLoadingIndicator />);

    const svg = screen.queryByRole('img');

    expect(svg).toBeInTheDocument();
  });

  it('must render a loading text', () => {
    render(<AbsoluteLoadingIndicator />);

    const text = screen.queryByText(/carregando/i);

    expect(text).toBeInTheDocument();
  });
});
