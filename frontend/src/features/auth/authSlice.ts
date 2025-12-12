// src/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  username: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; username?: string }>) {
      state.token = action.payload.token;
      if (action.payload.username) state.username = action.payload.username;

      localStorage.setItem("token", action.payload.token);
      if (action.payload.username) localStorage.setItem("username", action.payload.username);
    },

    clearAuth(state) {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

// Named exports for actions:
export const { setAuth, clearAuth } = slice.actions;

// Default export is the reducer:
export default slice.reducer;
