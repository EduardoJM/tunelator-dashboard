import { rest } from 'msw';
import config from '@/config';
import {
  accounts,
  receivedMails,
  refresh,
  login,
  plans,
  activePlan,
} from './fixtures';

export const handlers = [
  rest.get(`${config.apiUrl}/plans`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(plans));
  }),

  rest.get(`${config.apiUrl}/plans/active/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(activePlan));
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

  rest.get(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(login.user));
  }),

  rest.patch(`${config.apiUrl}/auth/user/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...login.user,
        first_name: 'changed',
        last_name: 'changed',
      })
    );
  }),

  rest.get(`${config.apiUrl}/mails/received/`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '10', 10);

    const data = {
      ...receivedMails,
      results: receivedMails.results.filter((_, index) => index < limit),
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get(`${config.apiUrl}/mails/accounts/`, (req, res, ctx) => {
    const limit = parseInt(req.url.searchParams.get('limit') || '10', 10);

    const data = {
      ...accounts,
      results: accounts.results.filter((_, index) => index < limit),
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post(`${config.apiUrl}/auth/recovery/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get(`${config.apiUrl}/auth/recovery/:id/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
