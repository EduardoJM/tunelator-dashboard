import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link as RoutingLink } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
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
    <Box as="footer" backgroundColor="brand.500" py="5" data-testid="footer">
      <Container maxW="120ch">
        <Flex flexWrap="wrap">
          <Box width={firstColumnSize} py="5" pr="5" textColor="white">
            <Heading as="h2" size="lg" mb="4">
              {t('footer.title')}
            </Heading>
            <Text mb="8">{t('footer.subtitle')}</Text>
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
            <Heading as="h2" size="lg" mb="5">
              {t('footer.help')}
            </Heading>
            <List>
              <ListItem mb="1">
                <Link href="#">{t('footer.howWorks')}</Link>
              </ListItem>
            </List>
          </Box>
          <Box width={thirdColumnSize} py="5" textColor="white">
            <Heading as="h2" size="lg" mb="5">
              {t('footer.links')}
            </Heading>
            <List>
              <ListItem mb="1">
                <Link as={RoutingLink} to="/mails">
                  {t('footer.accounts')}
                </Link>
              </ListItem>
              <ListItem mb="1">
                <Link as={RoutingLink} to="/received">
                  {t('footer.received')}
                </Link>
              </ListItem>
              <ListItem mb="1">
                <Link as={RoutingLink} to="/plans">
                  {t('footer.plans')}
                </Link>
              </ListItem>
              <ListItem mb="1">
                <Link as={RoutingLink} to="/customer/profile">
                  {t('footer.profile')}
                </Link>
              </ListItem>
            </List>
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
        <Text align="center">{t('footer.copyrights')}</Text>
      </Box>
    </Box>
  );
};

export default Footer;
