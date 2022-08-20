import { render, screen } from '@testing-library/react';
import { Ellipsis } from '@/components/ValueFormat';

describe('Ellipsis', () => {
  it('should be render an box', () => {
    render(<Ellipsis characteres={40}>This is my any text!</Ellipsis>);

    const box = screen.queryByTestId('ellipsis');

    expect(box).toBeInTheDocument();
  });

  it('should be contain overflow properties', () => {
    render(<Ellipsis characteres={40}>This is my any text!</Ellipsis>);

    const box = screen.getByTestId('ellipsis');

    expect(box).toHaveStyle('text-overflow: ellipsis');
    expect(box).toHaveStyle('overflow: hidden');
    expect(box).toHaveStyle('white-space: nowrap');
    expect(box).toHaveStyle('width: 40ch');
  });
});
