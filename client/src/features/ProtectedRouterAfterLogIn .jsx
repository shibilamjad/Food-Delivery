import { Navigate } from 'react-router-dom';

export const ProtectedRouterAfterLogIn = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to="/" /> : <>{children}</>;
};
