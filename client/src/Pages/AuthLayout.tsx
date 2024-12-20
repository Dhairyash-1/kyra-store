import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RootState } from "@/store/store";

const AuthLayout = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading, role } = useSelector(
    (state: RootState) => state.auth
  );
  const redirectQuery = new URLSearchParams(location.search).get("redirect");

  let redirectPath;
  if (role === "admin") {
    redirectPath = redirectQuery || "/admin";
  } else {
    redirectPath = redirectQuery || "/";
  }

  if (!isLoading && isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
