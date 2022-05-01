import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';
import Button from './Button';

export default {
  title: 'Components/Common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => (
  <>
    {args.variant === 'sidenavButton' ? (
      <Box w="200px" h="200px" p="10px" backgroundColor="blue.100">
        <Button {...args} leftIcon={<MdLogout />}>
          First Item
        </Button>
        <Button {...args} leftIcon={<MdLogout />}>
          Second Item
        </Button>
      </Box>
    ) : (
      <Button {...args}>Button</Button>
    )}
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const PrimaryRounded = Template.bind({});
PrimaryRounded.args = {
  variant: 'primaryRounded',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
};

export const FullGhost = Template.bind({});
FullGhost.args = {
  variant: 'fullGhost',
};

export const SideNavButton = Template.bind({});
SideNavButton.args = {
  variant: 'sidenavButton',
};

export const Destroy = Template.bind({});
Destroy.args = {
  variant: 'destroy',
};
