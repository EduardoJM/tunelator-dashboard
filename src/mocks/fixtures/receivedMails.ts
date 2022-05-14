import factory from '../factories/receivedMail';

const results = Array.from({ length: 12 }).map((_, index) =>
  factory({ id: index + 1 })
);

export default {
  count: 12,
  next: 'next_url',
  previous: 'previous_url',
  results,
};
