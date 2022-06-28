import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  { isAuthenticated: false },
  {
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
    },
  }
);
