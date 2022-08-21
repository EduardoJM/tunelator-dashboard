import faker from '@faker-js/faker';
import { ReceivedMail } from '@/entities/ReceivedMail';
import { getId } from './id';

const receivedMailFactory = (data?: Partial<ReceivedMail>): ReceivedMail => {
  return {
    id: getId(),
    date: faker.date.future().toISOString(),
    delivered: faker.datatype.boolean(),
    delivered_date: faker.date.future().toISOString(),
    mail: {
      id: getId(),
      mail: faker.internet.email(),
      redirect_to: faker.internet.email(),
    },
    origin_mail: faker.internet.email(),
    subject: faker.name.jobTitle(),
    ...(data || {}),
  };
};

export default receivedMailFactory;
