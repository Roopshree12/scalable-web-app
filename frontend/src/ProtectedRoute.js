import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

function ProtectedRoute({ children }) {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
