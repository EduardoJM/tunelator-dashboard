import { ComponentStory, ComponentMeta } from '@storybook/react';
import Ellipsis from './Ellipsis';

export default {
  title: 'Components/Value Format/Ellipsis',
  component: Ellipsis,
  argTypes: {
    characteres: { control: 'number' },
    children: { control: 'string' },
  },
} as ComponentMeta<typeof Ellipsis>;

const Template: ComponentStory<typeof Ellipsis> = args => (
  <Ellipsis {...args} />
);

export const Default = Template.bind({});
Default.args = {
  characteres: 20,
  children: 'This will break in 20 characteres and really.',
};
