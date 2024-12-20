import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AddProductForm } from "./components/admin/AddProductForm";
import { OrdersView } from "./components/admin/orders/OrdersView";
import AppLayout from "./components/AppLayout";
import FullPageLoader from "./components/FullPageLoader";
import ManageAddresses from "./components/ManageAddresses";
import Notifications from "./components/Notifications";
import UserProfile from "./components/profile/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./components/Settings";
import { Toaster } from "./components/ui/toaster";
import Wishlist from "./components/Wishlist";
import { updateAuthStatus } from "./features/auth/authSlice";
import AdminLayout from "./Pages/admin/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import ProductManage from "./Pages/admin/ProductManage";
import AuthLayout from "./Pages/AuthLayout";
import CartPage from "./Pages/CartPage";
import EnterOtp from "./Pages/EnterOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import MyOrders from "./Pages/MyOrders";
import MyProfileLayout from "./Pages/MyProfileLayout";
import OrderDetails from "./Pages/OrderDetails";
import ProductPage from "./Pages/ProductPage";
import Products from "./Pages/Products";
import Shipping from "./Pages/Shipping";
import Signup from "./Pages/Signup";
import { useGetCurrentUserQuery } from "./services/authApi";
import { RootState } from "./store/store";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const { data, isLoading, error } = useGetCurrentUserQuery();
  const { isLoading: isAuthLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      dispatch(
        updateAuthStatus({
          isAuthenticated: false,
          userId: null,
          role: null,
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
          role: data.data.role,
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
          role: null,
          profileImage: "",
          userId: null,
          isLoading: false,
        })
      );
    }
  }, [data, isLoading, error, dispatch]);

  if (isAuthLoading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:slug" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/enter-otp" element={<EnterOtp />} />
          </Route>

          {/* Protected user routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <AppLayout>
                  <MyProfileLayout />
                </AppLayout>
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="wishlists" element={<Wishlist />} />
            <Route path="manage-address" element={<ManageAddresses />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="shipping" element={<Shipping />} />
          </Route>

          {/* Admin routes*/}
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="admin">
              <Route index element={<Dashboard />} />
              <Route path="products">
                <Route index element={<ProductManage />} />
                <Route path="create" element={<AddProductForm />} />
                <Route path="edit/:id" element={<AddProductForm />} />
              </Route>
              <Route path="orders" element={<OrdersView />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
