import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import FullPageLoader from "./FullPageLoader";

import { RootState } from "@/store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps): React.ReactNode => {
  const { isAuthenticated, role, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const location = useLocation();

  if (!isAuthenticated && !isLoading) {
    // Redirect to login if not authenticated
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }
  if (
    isAuthenticated &&
    !isLoading &&
    allowedRoles &&
    !allowedRoles.includes(role as string)
  ) {
    return <Navigate to={"/"} />;
  }

  // Return loading state until the authentication check is complete
  if (isLoading) {
    return <FullPageLoader />; // Or any placeholder like loading spinner
  }

  // Render children (protected content) only if authenticated and authorized
  return children;
};

export default ProtectedRoute;
