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
import Button from "../Button";
import { getLatestMails } from "../../services/mails";

const LatestMailAccounts: FC = () => {
  const { data, error, isLoading } = useQuery("latest-mails", () =>
    getLatestMails()
  );

  return (
    <>
      <Heading as="h2" size="md" mb="40px" fontWeight="bold">
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
          <Table size="sm">
            <Thead>
              <Tr>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Conta
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  E-mail
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Criado em
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Atualizado em
                </Th>
                <Th
                  borderColor="brand.500"
                  borderBottomWidth="2px"
                  bgColor="gray.100"
                >
                  Ativo
                </Th>
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
                        colorScheme="brand"
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
      <Flex alignItems="center" justifyContent="end" mt="30px">
        <Button variant="primary">Ver Tudo</Button>
      </Flex>
    </>
  );
};

export default LatestMailAccounts;
