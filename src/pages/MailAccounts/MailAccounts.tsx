import { FC, useMemo } from 'react';
import {
  Container,
  Heading,
  Flex,
  ButtonGroup,
  Button,
  VStack,
  Box,
  Text,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingIndicatorBox from '../../components/LoadingIndicatorBox';
import { getMailsPaginated } from '../../services/mails';

const MailAccounts: FC = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const page = useMemo(() => {
    if (!pageNumber) {
      return 1;
    }
    const num = parseInt(pageNumber, 10);
    if (Number.isNaN(num)) {
      return 1;
    }
    return num;
  }, [pageNumber]);
  const { data, error, isLoading } = useQuery(['mails', page], () =>
    getMailsPaginated(page)
  );
  const pagination = useMemo(() => {
    if (!data) {
      return null;
    }
    const length = Math.ceil(data.count / 10);
    return Array.from({ length }).map((_, index) => index + 1);
  }, [data]);

  const handleNavigateToPage = (page: number) => {
    navigate(`/mails/${page}`);
  };

  return (
    <>
      <Container maxW="120ch">
        <Heading as="h1" size="lg" my="50px" fontWeight="bold">
          Minhas Contas de E-mail
        </Heading>

        {isLoading ? (
          <LoadingIndicatorBox />
        ) : (
          <VStack width="100%">
            {data?.results.map(userMail => (
              <Box
                key={userMail.id}
                mb="25px"
                width="100%"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
                p="20px"
                _hover={{ backgroundColor: 'gray.50' }}
              >
                <VStack width="100%">
                  <Heading width="100%" as="h2" size="md" fontWeight="bold">
                    {userMail.name}
                  </Heading>
                  <Box width="100%">
                    <Text mb="10px">{userMail.mail}</Text>
                  </Box>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
        {!!pagination && (
          <Flex alignItems="center" justifyContent="end" mt="50px">
            <ButtonGroup size="sm" isAttached variant="outline">
              {pagination.map(page => (
                <Button
                  key={page}
                  mr="-px"
                  onClick={() => handleNavigateToPage(page)}
                  colorScheme="brand"
                >
                  {page}
                </Button>
              ))}
            </ButtonGroup>
          </Flex>
        )}
      </Container>
    </>
  );
};

export default MailAccounts;
