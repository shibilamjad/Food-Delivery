import { Navigate } from "react-router-dom";
import { AppLayout } from "../ui/AppLayout";

export const ProtectedRoutesHomePage = () => {
  const token = localStorage.getItem("token");

  return token ? <AppLayout /> : <Navigate to="/login" />;
};
