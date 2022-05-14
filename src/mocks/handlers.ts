import { rest } from 'msw';
import config from '../config';
import { accounts, receivedMails, refresh, login, plans } from './fixtures';

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

  rest.post(`${config.apiUrl}/auth/create/`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(login));
  }),

  rest.get(`${config.apiUrl}/api/mails/received/`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '10', 10);

    const data = {
      ...receivedMails,
      results: receivedMails.results.filter((_, index) => index < limit),
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get(`${config.apiUrl}/api/mails/accounts/`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '10', 10);

    const data = {
      ...accounts,
      results: accounts.results.filter((_, index) => index < limit),
    };

    return res(ctx.status(200), ctx.json(data));
  }),
];
