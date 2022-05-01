import { FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';

const NotFoundPage = lazy(() => import('./pages/NotFound'));

const LoginPage = lazy(() => import('./pages/Login'));
const SignupPage = lazy(() => import('./pages/Signup'));

const HomePage = lazy(() => import('./pages/Home'));
const MailAccountsPage = lazy(() => import('./pages/MailAccounts'));
const ReceivedMailsPage = lazy(() => import('./pages/ReceivedMails'));
const PlansPage = lazy(() => import('./pages/Plans'));

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        <Route path="/mails/:pageNumber" element={<MailAccountsPage />} />
        <Route path="/mails" element={<MailAccountsPage />} />
        <Route path="/received" element={<ReceivedMailsPage />} />
        <Route path="/received/:pageNumber" element={<ReceivedMailsPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
