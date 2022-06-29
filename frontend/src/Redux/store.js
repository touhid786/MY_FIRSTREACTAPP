import { configureStore } from "@reduxjs/toolkit";
// import { activateReducer } from "./Reducers/ActivateReducer";
// import { authReducer } from "./Reducers/AuthReducer";
import {authSlice} from "./Reducers/authSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  }
  // reducer: { auth: authReducer, activate: activateReducer },
});

export default store;
