import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const firstColumnSize = useBreakpointValue({
    base: '100%',
    lg: '33.33%',
  });
  const secondColumnSize = useBreakpointValue({
    base: '100%',
    md: '50%',
    lg: '33.33%',
  });
  const thirdColumnSize = useBreakpointValue({
    base: '100%',
    md: '50%',
    lg: '33.33%',
  });

  return (
    <Box backgroundColor="brand.500" py="5">
      <Container maxW="120ch">
        <Flex flexWrap="wrap">
          <Box width={firstColumnSize} py="5" pr="5" textColor="white">
            <Heading as="h2" size="lg" mb="4">
              TUNELATOR
            </Heading>
            <Text mb="8">
              Redirecionando e-mails para ajudar você a cuidar da sua caixa de
              e-mails com foco na sua privacidade.
            </Text>
            <Flex gap="15px" mb="5">
              <Link href="https://instagram.com/tunelator.com.br">
                <FaInstagram size="32px" />
              </Link>
              <Link href="#">
                <FaYoutube size="32px" />
              </Link>
              <Link href="#">
                <FaTwitter size="32px" />
              </Link>
            </Flex>
          </Box>
          <Box width={secondColumnSize} py="5" pr="5" textColor="white">
            <Heading as="h2" size="lg">
              Sobre
            </Heading>
          </Box>
          <Box width={thirdColumnSize} py="4" textColor="white">
            <Heading as="h2" size="lg">
              Links
            </Heading>
          </Box>
        </Flex>
      </Container>
      <Box
        width="100%"
        pt="5"
        borderTopColor="rgba(255, 255, 255, 0.1)"
        borderTopWidth="1px"
        textColor="white"
      >
        <Text align="center">
          Copyright &copy; 2022 Tunelator. Todos os direitos reservados.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
