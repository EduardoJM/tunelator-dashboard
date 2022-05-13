import { FC } from 'react';
import { Box } from '@chakra-ui/react';

export interface EllipsisProps {
  characteres: number;
}

const Ellipsis: FC<EllipsisProps> = ({ characteres, children }) => {
  return (
    <Box
      width={`${characteres}ch`}
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      data-testid="ellipsis"
    >
      {children}
    </Box>
  );
};

export default Ellipsis;
