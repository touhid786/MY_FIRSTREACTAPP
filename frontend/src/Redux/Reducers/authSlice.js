import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
  },
  
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
     //console.log(action);
     state.user= action.payload;
     state.isAuthenticated = true;

    },
    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

export const { setAuthentication, setOtp } = authSlice.actions;
export default authSlice.reducer;
