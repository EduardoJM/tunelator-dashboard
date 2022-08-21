import { screen, render } from '@testing-library/react';
import { AbsoluteLoadingIndicator } from '@/components/Placeholders';

describe('AbsoluteLoadingIndicator', () => {
  it('should render a fixed positioned screen', () => {
    render(<AbsoluteLoadingIndicator />);

    const overlay = screen.queryByTestId('absolute-loading-overlay');

    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('position: fixed');
  });

  it('should render a svg', () => {
    render(<AbsoluteLoadingIndicator />);

    const svg = screen.queryByRole('img');

    expect(svg).toBeInTheDocument();
  });

  it('should render a loading text', () => {
    render(<AbsoluteLoadingIndicator />);

    const text = screen.queryByTestId('absolute-loading-text');

    expect(text).toBeInTheDocument();
  });
});
