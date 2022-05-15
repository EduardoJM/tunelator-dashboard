import { FC, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';

const NotFoundPage = lazy(() => import('./pages/NotFound'));

const LoginPage = lazy(() => import('./pages/Login'));
const SignupPage = lazy(() => import('./pages/Signup'));

const HomePage = lazy(() => import('./pages/Home'));
const MailAccountsPage = lazy(() => import('./pages/MailAccounts'));
const ReceivedMailsPage = lazy(() => import('./pages/ReceivedMails'));
const PlansPage = lazy(() => import('./pages/Plans'));

const CheckoutAlreadyPaidPage = lazy(
  () => import('./pages/Checkout/AlreadyPaid')
);
const CheckoutErrorPage = lazy(() => import('./pages/Checkout/Error'));
const CheckoutSuccessPage = lazy(() => import('./pages/Checkout/Success'));
const CheckoutCanceledPage = lazy(() => import('./pages/Checkout/Canceled'));

const CustomerErrorPage = lazy(() => import('./pages/Customer/Error'));
const CustomerProfilePage = lazy(() => import('./pages/Customer/Profile'));

const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<HomePage />} />

          <Route path="mails" element={<Outlet />}>
            <Route path="" element={<MailAccountsPage />} />
            <Route path=":pageNumber" element={<MailAccountsPage />} />
          </Route>
          <Route path="received" element={<Outlet />}>
            <Route path="" element={<ReceivedMailsPage />} />
            <Route path=":pageNumber" element={<ReceivedMailsPage />} />
          </Route>
          <Route path="plans" element={<PlansPage />} />

          <Route path="checkout" element={<Outlet />}>
            <Route path="" element={<NotFoundPage />} />
            <Route path="already-paid" element={<CheckoutAlreadyPaidPage />} />
            <Route path="error" element={<CheckoutErrorPage />} />
            <Route path="canceled" element={<CheckoutCanceledPage />} />
            <Route path="success" element={<CheckoutSuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="customer" element={<Outlet />}>
            <Route path="" element={<NotFoundPage />} />
            <Route path="error" element={<CustomerErrorPage />} />
            <Route path="profile" element={<CustomerProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
