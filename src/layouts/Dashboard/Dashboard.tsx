import { FC } from "react";
import { Box, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";

const Dashboard: FC = ({ children }) => {
  return (
    <Box width="100%">
      <NavBar />

      <Box width="100%">{children}</Box>
    </Box>
  );
};

export default Dashboard;
