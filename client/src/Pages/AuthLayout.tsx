import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RootState } from "@/store/store";

const AuthLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log("lo state", location);
  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
