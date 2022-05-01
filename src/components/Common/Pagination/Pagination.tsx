import { FC, useMemo } from 'react';
import { Flex, ButtonGroup, Button } from '@chakra-ui/react';

export interface PaginationProps {
  totalCount: number;
  itemsPerPage?: number;
  currentPage: number;
  onGoToPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalCount,
  currentPage,
  itemsPerPage = 5,
  onGoToPage,
}) => {
  const pagination = useMemo(() => {
    if (!totalCount) {
      return null;
    }
    const length = Math.ceil(totalCount / itemsPerPage);
    return Array.from({ length }).map((_, index) => index + 1);
  }, [totalCount, itemsPerPage]);

  const handleGoToPage = (page: number) => onGoToPage(page);

  if (!pagination) {
    return null;
  }
  return (
    <Flex alignItems="center" justifyContent="end" mb="50px">
      <ButtonGroup size="sm" isAttached variant="outline">
        {pagination.map(page => (
          <Button
            key={page}
            mr="-px"
            onClick={() => handleGoToPage(page)}
            colorScheme="brand"
            isActive={page == currentPage}
            _active={{
              backgroundColor: 'brand.500',
              color: 'white',
              borderColor: 'brand.500',
              borderWidth: '1px',
            }}
          >
            {page}
          </Button>
        ))}
      </ButtonGroup>
    </Flex>
  );
};

export default Pagination;
