import { FC, useMemo } from 'react';
import { Flex, ButtonGroup } from '@chakra-ui/react';
import Button from '../Button';

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
      <ButtonGroup size="sm" isAttached variant="outline" overflowX="auto" p="2">
        {pagination.map(page => (
          <Button
            variant="pagination"
            key={page}
            onClick={() => handleGoToPage(page)}
            isActive={page == currentPage}
            borderRightWidth={page === pagination.length ? '1px' : '0'}
          >
            {page}
          </Button>
        ))}
      </ButtonGroup>
    </Flex>
  );
};

export default Pagination;
