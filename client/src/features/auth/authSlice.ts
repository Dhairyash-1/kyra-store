import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface authStateType {
  isAuthenticated: boolean;
  userId: number | null;
  isLoading: boolean;
}

const initialState: authStateType = {
  isAuthenticated: false,
  userId: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthStatus: (state, action: PayloadAction<authStateType>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;
      state.isLoading = action.payload.isLoading;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateAuthStatus } = authSlice.actions;
export default authSlice.reducer;
