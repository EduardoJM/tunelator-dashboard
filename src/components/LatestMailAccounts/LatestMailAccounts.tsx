import { FC } from "react";
import { useQuery } from "react-query";
import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Flex,
  CircularProgress,
  Heading,
  FormControl,
  Switch,
} from "@chakra-ui/react";
import Ellipsis from "../Ellipsis";
import DateTime from "../DateTime";
import { getLatestMails } from "../../services/mails";

const LatestMailAccounts: FC = () => {
  const { data, error, isLoading } = useQuery("latest-mails", () =>
    getLatestMails()
  );

  return (
    <>
      <Heading as="h2" size="lg" mb="40px" fontWeight="normal">
        Minhas contas de e-mail
      </Heading>
      {isLoading ? (
        <Flex
          width="100%"
          height="200px"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress isIndeterminate={true} color="brand.500" />
        </Flex>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Conta</Th>
                <Th>E-mail</Th>
                <Th>Criado em</Th>
                <Th>Atualizado em</Th>
                <Th>Ativo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((userMail) => (
                <Tr key={userMail.mail}>
                  <Td>{userMail.name}</Td>
                  <Td>
                    <Ellipsis characteres={30}>{userMail.mail}</Ellipsis>
                  </Td>
                  <Td>
                    <DateTime value={userMail.created_at} />
                  </Td>
                  <Td>
                    <DateTime value={userMail.updated_at} />
                  </Td>
                  <Td>
                    <FormControl display="flex" alignItems="center">
                      <Switch
                        id="email-alerts"
                        defaultChecked={userMail.redirect_enabled}
                      />
                    </FormControl>
                    {userMail.redirect_enabled}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default LatestMailAccounts;
