import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import Pagination from './Pagination';

export default {
  title: 'Components/Common/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = args => (
  <Box width="300px">
    <Pagination {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  itemsPerPage: 10,
  totalCount: 25,
  currentPage: 1,
};
