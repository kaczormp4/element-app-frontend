import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface SecuredRouteProps {
  children: React.ReactNode;
}

const SecuredRoute: React.FC<SecuredRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default SecuredRoute;
