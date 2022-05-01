import { ComponentStory, ComponentMeta } from '@storybook/react';
import DateTime from './DateTime';

export default {
  title: 'Components/Value Format/DateTime',
  component: DateTime,
  argTypes: {
    value: { control: 'date' },
  },
} as ComponentMeta<typeof DateTime>;

const Template: ComponentStory<typeof DateTime> = args => (
  <DateTime {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: '2022-12-25T08:00',
};
