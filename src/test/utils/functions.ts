import { waitFor, screen } from '@testing-library/react';

export const waitFunctionCall = async (fn: jest.Mock) =>
  waitFor(() => {
    expect(fn).toHaveBeenCalled();
  });
