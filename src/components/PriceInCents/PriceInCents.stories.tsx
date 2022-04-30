import { ComponentStory, ComponentMeta } from '@storybook/react';
import PriceInCents from './PriceInCents';

export default {
  title: 'Components/Value Format/PriceInCents',
  component: PriceInCents,
  argTypes: {
    value: { control: 'number' },
  },
} as ComponentMeta<typeof PriceInCents>;

const Template: ComponentStory<typeof PriceInCents> = args => (
  <PriceInCents {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 12000,
};
