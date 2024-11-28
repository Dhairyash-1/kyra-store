import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import { authApi } from "@/services/authApi";
import { categoryApi } from "@/services/categoryApi";
import { productApi } from "@/services/productApi";
import { wishlistApi } from "@/services/wishlistApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(wishlistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
