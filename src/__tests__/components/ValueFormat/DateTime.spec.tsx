import { screen, render } from '@testing-library/react';
import { DateTime } from '@/components/ValueFormat';

describe('DateTime', () => {
  it('should be display correctly parsing value using ISO 8601', () => {
    render(<DateTime value="2022-04-22T10:24:45" />);

    const date = screen.queryByText(/^22 de abril de 2022/i);
    const time = screen.queryByText(/10:24$/i);

    expect(date).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });
});
