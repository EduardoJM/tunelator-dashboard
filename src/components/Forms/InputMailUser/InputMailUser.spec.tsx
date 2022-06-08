import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputMailUser from './InputMailUser';

describe('InputMailUser', () => {
  it('should render an input an label', () => {
    render(<InputMailUser label="My Label" id="my-input" />);

    const textbox = screen.queryByRole('textbox');
    const labeled = screen.queryByLabelText(/^My Label$/i);

    expect(textbox).toBeInTheDocument();
    expect(labeled).toEqual(textbox);
  });

  it('should render the default domain if the domain prop is not parsed', () => {
    render(<InputMailUser label="My Label" id="my-input" />);

    const domain = screen.queryByText(/^@tunelator\.com\.br$/i);
    expect(domain).toBeInTheDocument();
  });

  it('should render the custom domain if the domain prop is parsed', () => {
    render(
      <InputMailUser label="My Label" id="my-input" domain="@domain.ddd.br" />
    );

    const domain = screen.queryByText(/^@domain\.ddd\.br$/i);
    expect(domain).toBeInTheDocument();
  });

  it('should render an help text if the helpText is parsed', () => {
    render(
      <InputMailUser label="My Label" id="my-input" helpText="my-any-help!" />
    );

    const helpText = screen.queryByText(/^my-any-help!$/i);
    expect(helpText).toBeInTheDocument();
  });

  it('should type in the input transform the text to lower case', async () => {
    render(<InputMailUser label="My Label" id="my-input" />);

    const textbox = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(textbox, 'HANDLE');
    });

    expect(textbox).toHaveValue('handle');
  });

  it('should type in the input must call the onChange prop', async () => {
    const onChange = jest.fn();

    render(
      <InputMailUser label="My Label" id="my-input" onChange={onChange} />
    );

    const textbox = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(textbox, 'h');
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should not whitespace or accent', async () => {
    render(<InputMailUser label="My Label" id="my-input" />);

    const textbox = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(textbox, 'handle ~ ã');
    });

    expect(textbox).toHaveValue('handle');
  });
});
