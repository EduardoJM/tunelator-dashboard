import { rest } from 'msw';
import config from '../config';
import { plans, refresh, login, receivedMails, accounts } from './data.json';

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
    return res(
      ctx.status(201),
      ctx.json({
        refresh: 'refresh token',
        access: 'access token',
        user: {
          id: 1,
          email: 'example@example.com',
          first_name: 'example',
          last_name: 'example',
          date_joined: '2022-04-22T10:24:45',
          last_login: '2022-04-22T10:24:45',
        },
      })
    );
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
