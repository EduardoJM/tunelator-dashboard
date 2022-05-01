import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import Input from './Input';

export default {
  title: 'Components/Forms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => (
  <Box maxW="300px">
    <Input {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  label: 'Nome',
};
