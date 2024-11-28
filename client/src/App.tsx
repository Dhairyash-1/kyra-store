import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import ManageAddresses from "./components/ManageAddresses";
import MyOrders from "./components/MyOrders";
import Notifications from "./components/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedCards from "./components/SavedCards";
import Settings from "./components/Settings";
import { Toaster } from "./components/ui/toaster";
import UserProfile from "./components/UserProfile";
import Wishlist from "./components/Wishlist";
import { updateAuthStatus } from "./features/auth/authSlice";
import CartPage from "./Pages/CartPage";
import EnterOtp from "./Pages/EnterOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import MyProfileLayout from "./Pages/MyProfileLayout";
import ProductPage from "./Pages/ProductPage";
import Products from "./Pages/Products";
import Shipping from "./Pages/Shipping";
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
          name: "",
          profileImage: "",
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
          name: `${data.data.firstName} ${data.data.lastName}`,
          profileImage: data.data.imgUrl,
          isLoading: false,
        })
      );
    } else {
      dispatch(
        updateAuthStatus({
          isAuthenticated: false,
          name: "",
          profileImage: "",
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
            <Route path="/cart" element={<CartPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <MyProfileLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/wishlists" element={<Wishlist />} />
              <Route path="/manage-address" element={<ManageAddresses />} />
              <Route path="/saved-cards" element={<SavedCards />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
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
      <Toaster />
    </>
  );
};

export default App;
