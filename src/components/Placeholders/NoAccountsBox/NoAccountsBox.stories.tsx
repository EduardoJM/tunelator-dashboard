import { ComponentStory, ComponentMeta } from '@storybook/react';
import NoAccountsBox from './NoAccountsBox';

export default {
  title: 'Components/Placeholders/No Accounts Box',
  component: NoAccountsBox,
} as ComponentMeta<typeof NoAccountsBox>;

const Template: ComponentStory<typeof NoAccountsBox> = args => (
  <NoAccountsBox {...args} />
);

export const OnlyTextAndIcon = Template.bind({});
OnlyTextAndIcon.args = {
  createFirstButtonVisible: false,
};

export const WithCreateButton = Template.bind({});
WithCreateButton.args = {
  createFirstButtonVisible: true,
};
