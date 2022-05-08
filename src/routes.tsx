import { FC, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/auth';

const NotFoundPage = lazy(() => import('./pages/NotFound'));

const LoginPage = lazy(() => import('./pages/Login'));
const SignupPage = lazy(() => import('./pages/Signup'));

const HomePage = lazy(() => import('./pages/Home'));
const MailAccountsPage = lazy(() => import('./pages/MailAccounts'));
const ReceivedMailsPage = lazy(() => import('./pages/ReceivedMails'));
const PlansPage = lazy(() => import('./pages/Plans'));

const CheckoutPage = lazy(() => import('./pages/Checkout'));
const CheckoutAlreadyPaidPage = lazy(
  () => import('./pages/Checkout/AlreadyPaid')
);
const CheckoutErrorPage = lazy(() => import('./pages/Checkout/Error'));
const CheckoutSuccessPage = lazy(() => import('./pages/Checkout/Success'));
const CheckoutCanceledPage = lazy(() => import('./pages/Checkout/Canceled'));

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
        <Route path="/checkout" element={<CheckoutPage />}>
          <Route path="already-paid" element={<CheckoutAlreadyPaidPage />} />
          <Route path="error" element={<CheckoutErrorPage />} />
          <Route path="canceled" element={<CheckoutCanceledPage />} />
          <Route path="success" element={<CheckoutSuccessPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
