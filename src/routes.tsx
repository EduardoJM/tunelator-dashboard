import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import Dashboard from './layouts/Dashboard';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import MailAccountsPage from './pages/MailAccounts';

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <Dashboard>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mails/:pageNumber" element={<MailAccountsPage />} />
            <Route path="/mails" element={<Navigate to="/mails/1" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Dashboard>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
