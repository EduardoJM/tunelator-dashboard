import { render, screen } from '@testing-library/react';
import { wrapper } from '@/mocks/contexts/wrapper';
import { mockOnce } from '@/mocks/server';
import accountFactory from '@/mocks/factories/account';
import { waitAbsoluteLoader, waitForTime } from '@/test/utils/loaders';
import { waitFunctionCall } from '@/test/utils/functions';
import WaitMailAccountDone from './WaitMailAccountDone';

describe('WaitMailAccountDone', () => {
  it('should render a creating mail box placeholder component', async () => {
    const id = 10;
    const onAccountIsDone = jest.fn();

    const apiCallback = mockOnce(
      'get',
      `/mails/accounts/${id}/`,
      200,
      accountFactory()
    );

    render(
      <WaitMailAccountDone accountId={id} onAccountIsDone={onAccountIsDone} />,
      { wrapper }
    );

    await waitAbsoluteLoader();
    await waitFunctionCall(apiCallback);

    const creatingMailBox = screen.queryByTestId('creating-mail-box');

    expect(creatingMailBox).toBeInTheDocument();
  });

  it('should not call onAccountIsDone if the mail data is not provided', async () => {
    const id = 10;
    const onAccountIsDone = jest.fn();

    const data = accountFactory({
      mail: undefined,
    });
    const apiCallback = mockOnce('get', `/mails/accounts/${id}/`, 200, data);

    render(
      <WaitMailAccountDone accountId={id} onAccountIsDone={onAccountIsDone} />,
      { wrapper }
    );

    await waitAbsoluteLoader();
    await waitFunctionCall(apiCallback);

    expect(onAccountIsDone).not.toHaveBeenCalled();
  });

  it('should call onAccountIsDone if the mail data is provided', async () => {
    const id = 10;
    const onAccountIsDone = jest.fn();

    const data = accountFactory({
      mail: 'my_mail@mail.com.br',
    });
    const apiCallback = mockOnce('get', `/mails/accounts/${id}/`, 200, data);

    render(
      <WaitMailAccountDone accountId={id} onAccountIsDone={onAccountIsDone} />,
      { wrapper }
    );

    await waitAbsoluteLoader();
    await waitFunctionCall(apiCallback);

    expect(onAccountIsDone).toHaveBeenCalled();
  });

  it('should call onAccountIsDone in the next call for the API', async () => {
    const id = 10;
    const onAccountIsDone = jest.fn();

    const data = accountFactory({
      mail: undefined,
    });
    let apiCallback = mockOnce('get', `/mails/accounts/${id}/`, 200, data);

    render(
      <WaitMailAccountDone accountId={id} onAccountIsDone={onAccountIsDone} />,
      { wrapper }
    );

    await waitAbsoluteLoader();
    await waitFunctionCall(apiCallback);

    expect(onAccountIsDone).not.toHaveBeenCalled();

    data.mail = 'mail@mail.com';
    apiCallback = mockOnce('get', `/mails/accounts/${id}/`, 200, data);

    await waitForTime(2500);

    await waitFunctionCall(apiCallback);

    expect(onAccountIsDone).toHaveBeenCalled();
  });
});
