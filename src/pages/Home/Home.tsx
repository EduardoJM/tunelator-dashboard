import { FC } from "react";
import { Container, Heading } from "@chakra-ui/react";
import LatestMailAccounts from "../../components/LatestMailAccounts";

const Home: FC = () => {
  return (
    <>
      <Container maxW="120ch">
        <Heading as="h1" size="2xl" my="50px" fontWeight="normal">
          Bem-vindo!
        </Heading>
        <LatestMailAccounts />
      </Container>
    </>
  );
};

export default Home;
