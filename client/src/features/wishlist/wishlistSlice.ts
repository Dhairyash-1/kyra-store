import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductType } from "@/types/productType";

interface WishlistState {
  wishlist: ProductType[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<ProductType[]>) => {
      state.wishlist = action.payload;
    },

    addToWishlist: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      const exists = state.wishlist.some((item) => item.id === product.id);
      if (!exists) {
        state.wishlist.push(product);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
