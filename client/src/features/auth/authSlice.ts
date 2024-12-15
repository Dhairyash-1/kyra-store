import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface authStateType {
  isAuthenticated: boolean;
  userId: number | null;
  name: string;
  role: "admin" | "user" | null;
  profileImage: string;
  isLoading: boolean;
}

const initialState: authStateType = {
  isAuthenticated: false,
  userId: null,
  name: "",
  role: null,
  profileImage: "",
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthStatus: (state, action: PayloadAction<authStateType>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.isLoading = action.payload.isLoading;
      state.name = action.payload.name;
      state.profileImage = action.payload.profileImage;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateAuthStatus } = authSlice.actions;
export default authSlice.reducer;
