import { screen, render } from '@testing-library/react';
import DateTime from './DateTime';

describe('DateTime', () => {
  it('should be display correctly parsing value using ISO 8601', () => {
    render(<DateTime value="2022-04-22T10:24:45" />);

    const dateTime = screen.queryByText(/^22 de abril de 2022 às 10:24$/i);

    expect(dateTime).toBeInTheDocument();
  });

  it('should be not display anything parsing an invalid date string as value', () => {
    render(<DateTime value="1652449679383" />);

    const dateTime = screen.queryByText(/às/i);

    expect(dateTime).not.toBeInTheDocument();
  });
});
