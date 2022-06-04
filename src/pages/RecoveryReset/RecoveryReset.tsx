import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GiBackwardTime } from 'react-icons/gi';
import { useLoading } from '../../contexts/loading';
import { isSessionValid } from '../../services/api/recovery';
import { Button } from '../../components';

const RecoveryReset: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushLoading, popLoading } = useLoading();
  const [valid, setValid] = useState(true);
  const boxWidth = useBreakpointValue({ base: '100%', md: '50%' });

  useEffect(() => {
    const checkSession = async () => {
      if (!id) {
        setValid(false);
        return;
      }

      pushLoading();

      const sessionValid = await isSessionValid(id);
      setValid(sessionValid);

      popLoading();
    };

    checkSession();
  }, [id]);

  const handleGoToPasswordRecovery = () => {
    navigate('/recovery');
  };

  if (!valid) {
    return (
      <Flex h="100%" flexDir="column" alignItems="stretch">
        <Flex flex="1" alignItems="stretch" flexWrap="wrap-reverse">
          <Flex
            w={boxWidth}
            alignItems="stretch"
            justifyContent="center"
            flexDir="column"
          >
            <Heading as="h1" size="xl" color="brand.500">
              Esse link expirou...
            </Heading>
            <Heading
              as="h2"
              size="md"
              mt="50px"
              color="brand.500"
              fontWeight="normal"
            >
              Esse link expirou ou não é válido. Para recuperar a sua senha você
              precisa pedir um novo link.
            </Heading>
          </Flex>
          <Flex
            width={boxWidth}
            alignItems="center"
            justifyContent="center"
            color="brand.500"
          >
            <GiBackwardTime size="200px" />
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="center" pt="20px" pb="60px">
          <Button onClick={handleGoToPasswordRecovery} variant="primaryRounded">
            Recuperar Senha
          </Button>
        </Flex>
      </Flex>
    );
  }

  return <></>;
};

export default RecoveryReset;
