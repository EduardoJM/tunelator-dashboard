import { FC, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import Dashboard from './layouts/Dashboard';
import RequireAuth from './layouts/RequireAuth';
import PlansCheckout from './pages/PlansCheckout/PlansCheckout';

const NotFoundPage = lazy(() => import('./pages/NotFound'));

const LoginPage = lazy(() => import('./pages/Login'));
const SignupPage = lazy(() => import('./pages/Signup'));

const HomePage = lazy(() => import('./pages/Home'));
const MailAccountsPage = lazy(() => import('./pages/MailAccounts'));
const PlansPage = lazy(() => import('./pages/Plans'));

const AppRoutes: FC = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      <Routes>
        {loggedIn && (
          <Route
            path="/"
            element={
              <Dashboard>
                <HomePage />
              </Dashboard>
            }
          />
        )}
        <Route
          path="/mails/:pageNumber"
          element={
            <RequireAuth>
              <Dashboard>
                <MailAccountsPage />
              </Dashboard>
            </RequireAuth>
          }
        />
        <Route
          path="/mails"
          element={
            <RequireAuth>
              <Dashboard>
                <MailAccountsPage />
              </Dashboard>
            </RequireAuth>
          }
        />
        <Route
          path="/plans"
          element={
            <RequireAuth>
              <Dashboard>
                <PlansPage />
              </Dashboard>
            </RequireAuth>
          }
        />
        <Route
          path="/plans/checkout"
          element={
            <RequireAuth>
              <Dashboard>
                <PlansCheckout />
              </Dashboard>
            </RequireAuth>
          }
        />
        {!loggedIn && <Route path="/" element={<LoginPage />} />}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
