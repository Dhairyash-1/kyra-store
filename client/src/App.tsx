import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import FullPageLoader from "./components/FullPageLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import { updateAuthStatus } from "./features/auth/authSlice";
import EnterOtp from "./Pages/EnterOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import MyProfile from "./Pages/MyProfile";
import ProductPage from "./Pages/ProductPage";
import Products from "./Pages/Products";
import Signup from "./Pages/Signup";
import { useGetCurrentUserQuery } from "./services/authApi";

const App = () => {
  const { data, isLoading, error } = useGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      dispatch(
        updateAuthStatus({
          isAuthenticated: false,
          userId: null,
          isLoading: false,
        })
      );
      return;
    }

    if (data?.statusCode === 200 && data?.data?.id) {
      dispatch(
        updateAuthStatus({
          isAuthenticated: true,
          userId: data.data.id,
          isLoading: false,
        })
      );
    } else {
      dispatch(
        updateAuthStatus({
          isAuthenticated: false,
          userId: null,
          isLoading: false,
        })
      );
    }
  }, [data, isLoading, error, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
