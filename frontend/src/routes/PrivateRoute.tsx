import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login"/>
  if (requiredRole && user?.role !== requiredRole){
    return <Navigate to="/404"/>
  }
  return <>{children}</>;
};

export default PrivateRoute;
