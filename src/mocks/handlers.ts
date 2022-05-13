import { rest } from 'msw';
import config from '../config';
import { plans, refresh, login } from './data.json';

export const handlers = [
  rest.get(`${config.apiUrl}/api/plans`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(plans));
  }),

  rest.post(`${config.apiUrl}/auth/token/refresh/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(refresh));
  }),

  rest.post(`${config.apiUrl}/auth/token/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(login));
  }),
];
