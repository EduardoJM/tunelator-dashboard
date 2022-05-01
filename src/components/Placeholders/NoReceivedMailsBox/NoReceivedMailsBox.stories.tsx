import { ComponentStory, ComponentMeta } from '@storybook/react';
import NoReceivedMailsBox from './NoReceivedMailsBox';

export default {
  title: 'Components/Placeholders/No Received Mails Box',
  component: NoReceivedMailsBox,
  argTypes: {
    characteres: { control: 'number' },
    children: { control: 'string' },
  },
} as ComponentMeta<typeof NoReceivedMailsBox>;

const Template: ComponentStory<typeof NoReceivedMailsBox> = args => (
  <NoReceivedMailsBox {...args} />
);

export const Default = Template.bind({});
