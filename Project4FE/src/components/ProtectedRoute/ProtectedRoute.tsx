import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";



const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;