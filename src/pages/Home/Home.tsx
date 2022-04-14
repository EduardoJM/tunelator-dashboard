import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Container,
} from "@chakra-ui/react";
import { getLatestMails } from "../../services/mails";

const Home: FC = () => {
  const { data, error, isLoading } = useQuery("latest-mails", () =>
    getLatestMails()
  );

  console.log(data);

  return (
    <>
      {isLoading ? (
        <>Carregando...</>
      ) : (
        <>
          <Container maxW="120ch">
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Conta</Th>
                    <Th>E-mail</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((userMail) => (
                    <Tr key={userMail.mail}>
                      <Td>{userMail.name}</Td>
                      <Td>{userMail.mail}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
("");
