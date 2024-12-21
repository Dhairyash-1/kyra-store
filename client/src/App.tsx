import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import { updateAuthStatus } from "./features/auth/authSlice";
import { useGetCurrentUserQuery } from "./services/authApi";
import { RootState } from "./store/store";
import ScrollToTop from "./utils/ScrollToTop";

const FullPageLoader = React.lazy(() => import("./components/FullPageLoader"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));

const AuthLayout = React.lazy(() => import("./Pages/AuthLayout"));
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const EnterOtp = React.lazy(() => import("./Pages/EnterOtp"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));

const AppLayout = React.lazy(() => import("./components/AppLayout"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const CartPage = React.lazy(() => import("./Pages/CartPage"));
const Products = React.lazy(() => import("./Pages/Products"));
const ProductPage = React.lazy(() => import("./Pages/ProductPage"));
const Shipping = React.lazy(() => import("./Pages/Shipping"));

const MyProfileLayout = React.lazy(() => import("./Pages/MyProfileLayout"));
const UserProfile = React.lazy(
  () => import("./components/profile/UserProfile")
);
const MyOrders = React.lazy(() => import("./Pages/MyOrders"));
const OrderDetails = React.lazy(() => import("./Pages/OrderDetails"));
const Wishlist = React.lazy(() => import("./components/Wishlist"));
const ManageAddresses = React.lazy(
  () => import("./components/ManageAddresses")
);
const Notifications = React.lazy(() => import("./components/Notifications"));
const Settings = React.lazy(() => import("./components/Settings"));

const AdminLayout = React.lazy(() => import("./Pages/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("./Pages/admin/Dashboard"));
const ProductManage = React.lazy(() => import("./Pages/admin/ProductManage"));
const OrdersView = React.lazy(
  () => import("./components/admin/orders/OrdersView")
);
const AddProductForm = React.lazy(
  () => import("./components/admin/AddProductForm")
);

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

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<FullPageLoader />}>
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
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
