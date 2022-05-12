import { rest } from 'msw';
import config from '../config';

export const handlers = [
  rest.get(`${config.apiUrl}/api/plans`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
