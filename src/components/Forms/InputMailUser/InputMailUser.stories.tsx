import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import InputMailUser from './InputMailUser';

export default {
  title: 'Components/Forms/InputMailUser',
  component: InputMailUser,
} as ComponentMeta<typeof InputMailUser>;

const Template: ComponentStory<typeof InputMailUser> = args => (
  <Box maxW="300px">
    <InputMailUser {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  domain: '@tunelator.com.br',
  label: 'Nome da Conta',
  helpText: 'Insira o nome da conta de e-mail',
};
