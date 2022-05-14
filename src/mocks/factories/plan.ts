import faker from '@faker-js/faker';
import { getId } from './id';
import { Plan, PlanType } from '../../entities/Plan';

const planFactory = (data?: Partial<Plan>): Plan => {
  return {
    id: getId(),
    display_features: [
      {
        name: faker.animal.dog(),
        enabled: faker.datatype.boolean(),
      },
    ],
    name: faker.name.jobTitle(),
    description: faker.name.jobDescriptor(),
    plan_type: PlanType.Free,
    monthly_price: parseInt(faker.commerce.price(1000, 9900, 0), 10),
    ...(data || {}),
  };
};

export default planFactory;
