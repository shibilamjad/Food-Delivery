import { Navigate } from "react-router-dom";

const ProtectedRouterAfterLogIn = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" /> : <>{children}</>;
};

export default ProtectedRouterAfterLogIn;
