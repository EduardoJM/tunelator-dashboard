import { FC, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useMailAccountsPaginated } from '@/services/queries';
import { NoAccountsBox } from '@/components/Placeholders';
import { MailAccountCard } from '@/components/Features';
import { Pagination } from '@/components/Common';
import { UserMail } from '@/entities/UserMail';

export interface MailAccountsListProps {
  onCreateUserMail: () => void;
  onDelete: (userMail: UserMail) => void;
  onEdit: (userMail: UserMail) => void;
  onToggleEnabledStatus: (userMail: UserMail) => void;
}

const MailAccountsList: FC<MailAccountsListProps> = ({
  onCreateUserMail,
  onDelete,
  onEdit,
  onToggleEnabledStatus,
}) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const currentPage = useMemo(() => {
    if (!pageNumber) {
      return 1;
    }
    const num = parseInt(pageNumber, 10);
    if (Number.isNaN(num)) {
      return 1;
    }
    return num;
  }, [pageNumber]);

  const { data } = useMailAccountsPaginated(currentPage);

  const handleRefreshPageAndLatest = () => {
    queryClient.invalidateQueries(['mails']);
    queryClient.invalidateQueries('latest-mails');
    queryClient.refetchQueries('latest-mails');
    queryClient.refetchQueries(['mails', currentPage]);
  };

  const handleNavigateToPage = (page: number) => {
    navigate(`/mails/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {data?.results.length === 0 && (
        <Flex
          width="100%"
          minHeight="400px"
          alignItems="center"
          mt="60px"
          backgroundColor="#EFEFEF"
          boxShadow="md"
          borderRadius="10px"
        >
          <NoAccountsBox
            createFirstButtonVisible
            onCreateFirstClick={onCreateUserMail}
          />
        </Flex>
      )}
      {data?.results.map(userMail => (
        <MailAccountCard
          key={userMail.id}
          userMail={userMail}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleEnabledStatus={onToggleEnabledStatus}
          onRefreshPageAndLatest={handleRefreshPageAndLatest}
        />
      ))}

      <Pagination
        totalCount={data?.count || 0}
        currentPage={currentPage}
        onGoToPage={handleNavigateToPage}
        itemsPerPage={5}
      />
    </>
  );
};

export default MailAccountsList;
