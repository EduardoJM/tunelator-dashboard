import faker from '@faker-js/faker';
import { SocialContent } from '@/entities/SocialContent';
import { getId } from './id';

const socialContentFactory = (data?: Partial<SocialContent>): SocialContent => {
  return {
    id: getId(),
    created_at: faker.date.future().toISOString(),
    updated_at: faker.date.future().toISOString(),
    link: faker.internet.url(),
    title: faker.commerce.productName(),
    type: faker.commerce.productMaterial(),
    description: faker.commerce.productAdjective(),
    image: faker.image.transport(),
    ...(data || {}),
  };
};

export default socialContentFactory;
