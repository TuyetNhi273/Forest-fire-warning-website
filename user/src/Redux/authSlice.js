import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegistering: false,
  isRegistered: false,
  isLoggingIn: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isRegistering = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.isRegistering = false;
      state.isRegistered = true;
    },
    registerFailure: (state) => {
      state.isRegistering = false;
      state.error = "Registration failed";
    },
    loginStart: (state) => {
      state.isLoggingIn = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.error = "Login failed";
    },
  },
});

export const { registerStart, registerSuccess, registerFailure, loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
