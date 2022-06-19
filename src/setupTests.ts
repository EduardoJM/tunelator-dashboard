import { toast } from '@chakra-ui/react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from './mocks/server';

import '@testing-library/jest-dom';

beforeAll(() => {
  server.listen();

  window.scrollTo = jest.fn();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

beforeEach(async () => {
  toast.closeAll();

  const toasts = screen.queryAllByRole('listitem');

  await Promise.all(toasts.map(toasts => waitForElementToBeRemoved(toasts)));
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
