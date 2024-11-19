import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import FullPageLoader from "./FullPageLoader";

import { RootState } from "@/store/store";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      return navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated, navigate, isLoading, location]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return children;
};

export default ProtectedRoute;
