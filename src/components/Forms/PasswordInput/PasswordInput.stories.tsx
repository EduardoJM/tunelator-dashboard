import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';

export default {
  title: 'Components/Forms/PasswordInput',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = args => (
  <Box maxW="300px">
    <PasswordInput {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Senha',
};
