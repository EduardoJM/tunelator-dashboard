import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import LoginPage from "./pages/Login";
import Dashboard from "./layouts/Dashboard";
import Home from "./pages/Home";

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <Dashboard>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
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
