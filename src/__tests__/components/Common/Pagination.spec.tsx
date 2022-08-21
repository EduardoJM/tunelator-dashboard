import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '@/components/Common';

describe('Pagination', () => {
  let onGoToPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('if has totalItems parsed as 0, must not render any button', () => {
    render(
      <Pagination onGoToPage={onGoToPage} totalCount={0} currentPage={0} />
    );

    const buttons = screen.queryAllByRole('button');

    expect(buttons).toHaveLength(0);
  });

  it('if has totalItems parsed without itemsPerPage, the itemsPerPage default must be 5', () => {
    render(
      <Pagination onGoToPage={onGoToPage} totalCount={11} currentPage={0} />
    );

    const buttons = screen.queryAllByRole('button');

    expect(buttons).toHaveLength(3);
  });

  it('if has totalItems parsed with itemsPerPage, the itemsPerPage must be used', () => {
    render(
      <Pagination
        onGoToPage={onGoToPage}
        totalCount={11}
        currentPage={0}
        itemsPerPage={2}
      />
    );

    const buttons = screen.queryAllByRole('button');

    expect(buttons).toHaveLength(6);
  });

  it('click on the buttons must call the onGoToPage', async () => {
    render(
      <Pagination onGoToPage={onGoToPage} totalCount={11} currentPage={0} />
    );

    const buttons = screen.queryAllByRole('button');

    let index = 0;

    for (const button of buttons) {
      await act(async () => {
        await userEvent.click(button);
      });
      expect(onGoToPage).toHaveBeenCalledTimes(index + 1);
      expect(onGoToPage).toHaveBeenLastCalledWith(index + 1);

      index += 1;
    }
  });

  it('the button of the currentPage must is active', async () => {
    render(
      <Pagination onGoToPage={onGoToPage} totalCount={11} currentPage={1} />
    );

    const firstPageButton = screen.queryByText(/^1$/i);
    expect(firstPageButton).toHaveAttribute('data-active');
  });
});
