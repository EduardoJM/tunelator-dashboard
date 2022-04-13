import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { LoadingProvider } from "./contexts/loading";
import theme from "./theme";
import AppRoutes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
