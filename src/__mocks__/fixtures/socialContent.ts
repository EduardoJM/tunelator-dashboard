import factory from '../factories/socialContent';

const results = Array.from({ length: 6 }).map((_, index) =>
  factory({ id: index + 1 })
);

export default {
  count: 6,
  next: 'next_url',
  previous: 'previous_url',
  results,
};
