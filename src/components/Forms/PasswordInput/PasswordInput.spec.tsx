import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
  it('must contains a label, a input and a button', () => {
    render(<PasswordInput label="Password" id="password" />);

    const input = screen.queryByLabelText(/^password$/i);
    const button = screen.queryByRole('button');
    const label = screen.queryByText(/^password$/i);

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input?.tagName.toUpperCase()).toEqual('INPUT');
    expect(label).toBeInTheDocument();
    expect(label?.tagName.toUpperCase()).toEqual('LABEL');
  });

  it('click on the button must toggle the input type between password and text', async () => {
    render(<PasswordInput label="Password" id="password" />);

    const input = screen.queryByLabelText<HTMLInputElement>(/password/i);
    const button = screen.queryByRole('button');

    expect(input?.type).toEqual('password');

    await act(async () => {
      await userEvent.click(button || new Element());
    });

    expect(input?.type).toEqual('text');

    await act(async () => {
      await userEvent.click(button || new Element());
    });

    expect(input?.type).toEqual('password');
  });
});
