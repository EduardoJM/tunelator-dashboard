import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '@/config';
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
    rest[method](`${config.apiUrl}${path}`, async (req, res, ctx) => {
      callback(req.body);
      return res.once(ctx.status(status), ctx.json(json));
    })
  );
  return callback;
}

export function mockOnceWithDelay(
  method: MockMethod,
  path: string,
  status: number,
  json: object,
  delay: number = 0
) {
  const callback = jest.fn();
  server.use(
    rest[method](`${config.apiUrl}${path}`, async (req, res, ctx) => {
      callback(req.body);
      return res.once(ctx.delay(delay), ctx.status(status), ctx.json(json));
    })
  );
  return callback;
}
