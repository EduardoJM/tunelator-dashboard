import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import LoginPage from "./pages/Login";

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <></>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
