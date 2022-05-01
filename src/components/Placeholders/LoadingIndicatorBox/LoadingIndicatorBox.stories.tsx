import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import LoadingIndicatorBox from './LoadingIndicatorBox';

export default {
  title: 'Components/Placeholders/LoadingIndicatorBox',
  component: LoadingIndicatorBox,
} as ComponentMeta<typeof LoadingIndicatorBox>;

const Template: ComponentStory<typeof LoadingIndicatorBox> = args => (
  <Box maxW="300px">
    <LoadingIndicatorBox {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
