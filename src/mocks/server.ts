import config from '@/config';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

export type MockMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export function mockOnce(
  method: MockMethod,
  path: string,
  status: number,
  json: object
): jest.Mock<any, any> {
  const callback = jest.fn();
  server.use(
    rest[method](`${config.apiUrl}${path}`, (req, res, ctx) => {
      callback();
      return res.once(ctx.status(status), ctx.json(json));
    })
  );
  return callback;
}
