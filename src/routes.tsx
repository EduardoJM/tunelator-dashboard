import { FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import Dashboard from './layouts/Dashboard';
//import LoginPage from './pages/Login';
//import SignupPage from './pages/Signup';
//import Home from './pages/Home';
//import NotFoundPage from './pages/NotFound';
//import MailAccountsPage from './pages/MailAccounts';

const LoginPage = lazy(() => import('./pages/Login'));
const SignupPage = lazy(() => import('./pages/Signup'));
const HomePage = lazy(() => import('./pages/Home'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const MailAccountsPage = lazy(() => import('./pages/MailAccounts'));

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn ? (
        <Dashboard>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mails/:pageNumber" element={<MailAccountsPage />} />
            <Route path="/mails" element={<MailAccountsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Dashboard>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
