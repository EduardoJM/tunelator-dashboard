import faker from '@faker-js/faker';
import { getId } from './id';
import { User } from '../../entities/User';

const userFactory = (data?: Partial<User>): User => {
  return {
    id: getId(),
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    date_joined: faker.date.future().toISOString(),
    last_login: faker.date.future().toISOString(),
    ...(data || {}),
  };
};

export default userFactory;
