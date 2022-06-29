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
    setAuthentication: (state, action) => {},
    setOtp: (state, action) => {
      const { phoneNumber, hash } = action.payload;
      state.otp.phone = phoneNumber;
      state.otp.hash = hash;
    },
  },
});

export const { setAuthentication, setOtp } = authSlice.actions;
export default authSlice.reducer;
