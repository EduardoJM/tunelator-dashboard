import faker from '@faker-js/faker';
import { UserMail } from '@/entities/UserMail';
import { getId } from './id';

const accountFactory = (data?: Partial<UserMail>): UserMail => {
  return {
    id: getId(),
    created_at: faker.date.future().toISOString(),
    mail_user: faker.name.firstName().toLowerCase(),
    mail: faker.internet.email(),
    name: faker.name.jobArea(),
    plan_enabled: faker.datatype.boolean(),
    redirect_enabled: faker.datatype.boolean(),
    redirect_to: faker.internet.email(),
    updated_at: faker.date.future().toISOString(),
    ...(data || {}),
  };
};

export default accountFactory;
