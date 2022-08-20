import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormEvent } from 'react';
import { Button } from '@/components/Common';

describe('Button', () => {
  it('must render a <button /> html tag', () => {
    render(<Button variant="primary" />);

    const button = screen.queryByRole('button');

    expect(button).toBeInTheDocument();
    expect(button?.tagName.toUpperCase()).toEqual('BUTTON');
  });

  it('passing type="submit" the button must submit an form', async () => {
    const onSubmit = jest.fn((e: FormEvent) => e.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" variant="primary" />
      </form>
    );

    const button = screen.queryByRole('button');

    await act(async () => {
      await userEvent.click(button || new Element());
    });

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
