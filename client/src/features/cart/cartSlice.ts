import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorType {
  id: number;
  name: string;
}
interface SizeType {
  name: string;
  id: number;
}
interface CartItem {
  id: number; //variantId
  productId: number;
  color: ColorType;
  size: SizeType;
  name: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  shippingCharge: number;
  totalQuantity: number;
  totalPrice: number;
}

const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    return JSON.parse(savedCart) as CartState;
  }
  return {
    items: [],
    shippingCharge: 0,
    totalQuantity: 0,
    totalPrice: 0,
  };
};

const initialState: CartState = loadCartFromLocalStorage();

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        id: number;
        productId: number;
        name: string;
        price: number;
        size: SizeType;
        color: ColorType;
        quantity?: number;
        image: string;
      }>
    ) {
      const {
        id,
        productId,
        name,
        price,
        color,
        size,
        quantity = 1,
        image,
      } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += price * quantity;
      } else {
        state.items.push({
          id,
          productId,
          name,
          color,
          size,
          price,
          quantity,
          image,
          totalPrice: price * quantity,
        });
      }
      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice +=
          (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setShippingCharge(state, action: PayloadAction<{ charge: number }>) {
      state.shippingCharge = action.payload.charge;
    },
  },
});

const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

export const cartMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = storeAPI.getState().cart;
    saveCartToLocalStorage(state);
    return result;
  };

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingCharge,
} = cartSlice.actions;
export default cartSlice.reducer;
