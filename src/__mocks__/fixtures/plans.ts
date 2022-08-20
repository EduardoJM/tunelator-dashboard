import factory from '../factories/plan';

const plans = Array.from({ length: 3 }).map((_, index) =>
  factory({ id: index + 1 })
);

export default plans;
