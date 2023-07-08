import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("token")) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
