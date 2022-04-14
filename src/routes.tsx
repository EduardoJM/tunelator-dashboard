import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import LoginPage from "./pages/Login";
import Dashboard from "./layouts/Dashboard";

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <Dashboard>
          <></>
        </Dashboard>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
