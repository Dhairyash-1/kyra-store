import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      return navigate("/login", { state: { from: location } });
    }

    if (
      isAuthenticated &&
      !isLoading &&
      allowedRoles &&
      !allowedRoles.includes(role as string)
    ) {
      return navigate("/");
    }
  }, [isAuthenticated, navigate, isLoading, location, allowedRoles, role]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return children;
};

export default ProtectedRoute;
