import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import InputMask from './InputMask';

export default {
  title: 'Components/Forms/InputMask',
  component: InputMask,
} as ComponentMeta<typeof InputMask>;

const Template: ComponentStory<typeof InputMask> = args => (
  <Box maxW="300px">
    <InputMask {...args} />
  </Box>
);

export const DateExample = Template.bind({});
DateExample.args = {
  mask: '99/99/9999',
  label: 'Data de Nascimento',
};

export const CPFExample = Template.bind({});
CPFExample.args = {
  mask: '999.999.999-99',
  label: 'CPF',
};
