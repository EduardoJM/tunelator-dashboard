import { ComponentStory, ComponentMeta } from '@storybook/react';
import AbsoluteLoadingIndicator from './AbsoluteLoadingIndicator';

export default {
  title: 'Components/Placeholders/AbsoluteLoadingIndicator',
  component: AbsoluteLoadingIndicator,
} as ComponentMeta<typeof AbsoluteLoadingIndicator>;

const Template: ComponentStory<typeof AbsoluteLoadingIndicator> = args => (
  <AbsoluteLoadingIndicator {...args} />
);

export const Default = Template.bind({});
Default.args = {};
