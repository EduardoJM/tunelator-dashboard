import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

const RequireNoAuth: FC = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (loggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireNoAuth;
