import { server } from './mocks/server';

import '@testing-library/jest-dom';

beforeAll(() => {
  server.listen();

  window.scrollTo = jest.fn();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
