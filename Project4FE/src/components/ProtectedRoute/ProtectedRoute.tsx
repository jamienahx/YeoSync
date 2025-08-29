import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";


//everything nested in between protected route in app.tsx is the children. hence the children are accepted here.
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;